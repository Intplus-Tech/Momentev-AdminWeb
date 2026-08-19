import ActivePagination from "../vendors/_components/ActivePagination";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getCustomerRequests } from "@/lib/actions/customer-requests";
import { getServiceCategories } from "@/lib/actions/categories";

interface SearchParamsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function CustomerRequestsPage({
  searchParams,
}: SearchParamsProps) {
  const params = await searchParams;

  const page =
    typeof params?.page === "string" ? parseInt(params.page, 10) : 1;
  const limit =
    typeof params?.limit === "string" ? parseInt(params.limit, 10) : 10;
  const search =
    typeof params?.search === "string" ? params.search : "";
  const status =
    typeof params?.status === "string" ? params.status : "all";
  const serviceCategoryId =
    typeof params?.serviceCategoryId === "string"
      ? params.serviceCategoryId
      : "";
  const dateFrom =
    typeof params?.dateFrom === "string" ? params.dateFrom : "";
  const dateTo =
    typeof params?.dateTo === "string" ? params.dateTo : "";

  // Fetch data in parallel
  const [requestsResult, categoriesResult] = await Promise.all([
    getCustomerRequests({
      page,
      limit,
      search,
      status,
      serviceCategoryId,
      dateFrom,
      dateTo,
    }),
    getServiceCategories(1, 100), // fetch all categories for the filter dropdown
  ]);

  const {
    success,
    data: requests = [],
    total = 0,
    error,
  } = requestsResult;

  const totalPages = Math.ceil(total / limit);

  // Extract categories for the filter dropdown
  const categories =
    categoriesResult.success && categoriesResult.data
      ? categoriesResult.data.data.map((c) => ({ _id: c._id, name: c.name }))
      : [];

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="bg-white rounded-xl p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold">
          Customer Requests
        </h1>
        <p className="text-muted-foreground text-sm">
          <span>{total.toLocaleString()} Total Requests</span>
        </p>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      )}

      {/* TABLE */}
      <DataTable columns={columns} data={requests} categories={categories} />

      {totalPages > 0 && (
        <ActivePagination currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
}
