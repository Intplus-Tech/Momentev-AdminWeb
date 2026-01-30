import { getServiceCategories } from "@/lib/actions/serviceCategories";
import CategoryTable from "./components/CategoryTable";


export default async function ServiceCategoriesPage() {
  const result = await getServiceCategories(1, 10);

  if (!result.success) {
    return <p className="text-red-500">{result.error}</p>;
  }

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-semibold">Service Categories</h1>
      <CategoryTable initialData={result.data!} />
    
    </div>
  );
}
