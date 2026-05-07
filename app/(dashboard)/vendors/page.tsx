import ActivePagination from "./_components/ActivePagination";
import { getAdminVendors } from "@/lib/actions/vendors";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

interface PageProps {
  searchParams: {
    page?: string;
    filter?: string;
    search?: string;
  };
}

export default async function VendorPage({ searchParams }: PageProps) {
  // Await search parameters before usage NextJS 15+ standard
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const currentFilter = resolvedParams.filter || "All";
  const currentSearch = resolvedParams.search || "";
  
  // Map "Active" / "Inactive" filters to boolean for the database
  let isActiveFilter: boolean | undefined = undefined;
  if (currentFilter === "Active") isActiveFilter = true;
  if (currentFilter === "Inactive") isActiveFilter = false;

  const result = await getAdminVendors(currentPage, 20, currentSearch, isActiveFilter, undefined);
  const data = result.success ? result.data : null;
  const totalVendors = data?.total || 0;
  
  const displayVendors = data?.data || [];
  const totalPages = data ? Math.ceil(data.total / (data.limit || 20)) : 0;

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="bg-white rounded-xl p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Vendor Management</h1>
        <p className="text-muted-foreground text-sm">
          {totalVendors} Total Registered Vendors
        </p>
      </div>

      {/* ERROR STATE */}
      {!result.success && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          Failed to load vendors: {result.error}
        </div>
      )}

      {/* TABLE */}
      {result.success && (
        <DataTable columns={columns} data={displayVendors} />
      )}

      {/* PAGINATION */}
      {totalPages > 0 && (
        <ActivePagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
        />
      )}
    </div>
  );
}
