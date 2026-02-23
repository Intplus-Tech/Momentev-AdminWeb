import { FileDown } from "lucide-react";
import ActivePagination from "../vendors/_components/ActivePagination";
import { Button } from "@/components/ui/button";
import { getServiceCategories } from "@/lib/actions/categories";
import { getServiceSpecialtiesByCategory } from "@/lib/actions/specialties";
import { getCommissions } from "@/lib/actions/commissions";
import { DynamicIcon } from "lucide-react/dynamic";
import { CategoryActions } from "./_components/CategoryActions";
import { CreateCategoryDialog } from "./_components/CreateCategoryDialog";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default async function CategoriesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const limit = 10;
  
  const categoriesResult = await getServiceCategories(currentPage, limit);
  const data = categoriesResult.success ? categoriesResult.data : null;
  const totalCategories = data?.total || 0;
  const categories = data?.data || [];
  
  // Fetch specialties and commissions concurrently
  const specialtiesPromises = categories.map(cat => getServiceSpecialtiesByCategory(cat._id));
  const commissionsPromise = getCommissions(1, 100);
  
  const [specialtiesResponses, commissionsResult] = await Promise.all([
    Promise.all(specialtiesPromises),
    commissionsPromise
  ]);

  const commissions = commissionsResult.success ? commissionsResult.data?.data || [] : [];
  
  // Map successful responses into a dictionary for fast lookup O(1)
  const specialtiesMap: Record<string, any[]> = {};
  categories.forEach((cat, index) => {
    const res = specialtiesResponses[index];
    if (res && res.success && res.data && Array.isArray(res.data.data)) {
      specialtiesMap[cat._id] = res.data.data;
    } else {
      specialtiesMap[cat._id] = [];
    }
  });

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="bg-white rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Service Categories</h1>
          <p className="text-muted-foreground text-sm">
            {totalCategories} Total Categories
          </p>
        </div>
        <CreateCategoryDialog />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
        {data ? (
          <div className="overflow-x-auto">
            <table className="min-w-[800px] w-full text-sm">
              <thead className="bg-gray-50/50 border-b">
                <tr className="text-left text-gray-500 font-medium">
                  <th className="p-4 rounded-tl-xl">Icon</th>
                  <th>Category Name</th>
                  <th className="w-1/3">Specialties</th>
                  <th className="w-1/3">Suggested Tags</th>
                  <th className="rounded-tr-xl">Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr
                      key={category._id}
                      className="hover:bg-gray-50 transition-colors border-b last:border-b-0"
                    >
                      <td className="p-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#2B4EFF]">
                          <DynamicIcon name={category.icon as any} className="w-5 h-5" />
                        </div>
                      </td>
                      <td className="font-semibold text-gray-900 capitalize">
                        {category.name}
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex flex-wrap gap-1.5">
                          {(specialtiesMap[category._id] || []).map((spec) => (
                              <span 
                                key={spec._id} 
                                className="px-2 py-1 bg-white border border-[#2B4EFF] text-[#2B4EFF] rounded-md text-[11px] font-medium whitespace-nowrap"
                              >
                                {spec.name}
                              </span>
                            ))}
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex flex-wrap gap-1.5">
                          {category.suggestedTags.slice(0, 5).map((tag, idx) => (
                            <span 
                              key={idx} 
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-[11px] font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {category.suggestedTags.length > 5 && (
                            <span className="px-2 py-1 bg-gray-50 border text-gray-500 rounded-md text-[11px] font-medium">
                              +{category.suggestedTags.length - 5} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="text-gray-400">
                        <CategoryActions 
                          category={category} 
                          initialSpecialties={specialtiesMap[category._id] || []}
                          commissions={commissions}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-red-500">
            Failed to load service categories: {categoriesResult.error}
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {data && data.total > 0 && (
        <ActivePagination 
          currentPage={data.page || 1} 
          totalPages={Math.ceil(data.total / (data.limit || limit))} 
        />
      )}
    </div>
  );
}