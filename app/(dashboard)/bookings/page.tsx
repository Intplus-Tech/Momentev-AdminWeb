import ActivePagination from "../vendors/_components/ActivePagination";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getAdminBookings } from "@/lib/actions/bookings";

interface SearchParamsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BookingsPage({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  
  const page = typeof params?.page === "string" ? parseInt(params.page, 10) : 1;
  const limit = typeof params?.limit === "string" ? parseInt(params.limit, 10) : 10;
  
  const status = typeof params?.status === "string" ? params.status : "all";
  const vendorId = typeof params?.vendorId === "string" ? params.vendorId : "";
  const customerId = typeof params?.customerId === "string" ? params.customerId : "";
  const from = typeof params?.from === "string" ? params.from : "";
  const to = typeof params?.to === "string" ? params.to : "";

  const { success, data, error } = await getAdminBookings(
    page,
    limit,
    status,
    vendorId,
    customerId,
    from,
    to
  );

  const bookings = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6 px-4 md:px-8 py-6 bg-[#F4F5F8] min-h-[calc(100vh-72px)]">
      {/* HEADER CARD */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm flex flex-col gap-2">
        <h1 className="text-xl sm:text-2xl font-semibold">Platform Bookings</h1>
        <p className="text-muted-foreground text-sm">
           {total.toLocaleString()} total bookings found
        </p>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* TABLE */}
      <DataTable columns={columns} data={bookings} />
      
      {totalPages > 0 && (
        <ActivePagination currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
}
