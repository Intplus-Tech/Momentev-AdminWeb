import ActivePagination from "../../vendors/_components/ActivePagination";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getPaymentQueue } from "@/lib/actions/finance";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface SearchParamsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PaymentQueuePage({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  
  const page = typeof params?.page === "string" ? parseInt(params.page, 10) : 1;
  const limit = typeof params?.limit === "string" ? parseInt(params.limit, 10) : 10;
  
  const status = typeof params?.status === "string" ? params.status : "all";
  const vendorId = typeof params?.vendorId === "string" ? params.vendorId : "";
  const customerId = typeof params?.customerId === "string" ? params.customerId : "";
  const bookingStatus = typeof params?.bookingStatus === "string" ? params.bookingStatus : "--";
  const paymentStatus = typeof params?.paymentStatus === "string" ? params.paymentStatus : "--";
  const from = typeof params?.from === "string" ? params.from : "";
  const to = typeof params?.to === "string" ? params.to : "";

  const { success, data, error } = await getPaymentQueue({
    page,
    limit,
    status,
    vendorId,
    customerId,
    bookingStatus,
    paymentStatus,
    from,
    to
  });

  const queueItems = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6 px-4 md:px-8 py-6 bg-[#F4F5F8] min-h-[calc(100vh-72px)]">
      {/* HEADER CARD */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left mb-2">
            <Link href="/financial">
              <Button variant="outline" size="icon" className="h-8 w-8 hidden sm:flex">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl sm:text-2xl font-semibold">Payment Queue</h1>
          </div>
          <p className="text-muted-foreground text-sm ml-0 sm:ml-12">
             {total.toLocaleString()} transactions in queue
          </p>
        </div>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* TABLE */}
      <DataTable columns={columns} data={queueItems} />
      
      {totalPages > 0 && (
        <ActivePagination currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
}
