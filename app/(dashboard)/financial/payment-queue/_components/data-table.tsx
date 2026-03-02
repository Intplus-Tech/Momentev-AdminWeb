"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();

  const currentQueueStatus = searchParams.get("status") || "all";
  const currentBookingStatus = searchParams.get("bookingStatus") || "--";
  const currentPaymentStatus = searchParams.get("paymentStatus") || "--";

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleFilterChange = (key: string, value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all" && value !== "--") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      // Reset page when filters change
      params.set("page", "1");
      
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
      <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row gap-4 justify-between bg-gray-50/50">
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
           {/* Queue Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 hidden sm:inline">Queue:</span>
            <Select
              value={currentQueueStatus}
              onValueChange={(value) => handleFilterChange("status", value)}
              disabled={isPending}
            >
              <SelectTrigger className="w-[140px] h-9 bg-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Booking Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 hidden sm:inline">Booking:</span>
            <Select
              value={currentBookingStatus}
              onValueChange={(value) => handleFilterChange("bookingStatus", value)}
              disabled={isPending}
            >
              <SelectTrigger className="w-[160px] h-9 bg-white">
                <SelectValue placeholder="Booking Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="--">All Bookings</SelectItem>
                <SelectItem value="pending_payment">Pending Payment</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Payment Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 hidden sm:inline">Payment:</span>
            <Select
              value={currentPaymentStatus}
              onValueChange={(value) => handleFilterChange("paymentStatus", value)}
              disabled={isPending}
            >
              <SelectTrigger className="w-[200px] h-9 bg-white">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="--">All Stripe States</SelectItem>
                <SelectItem value="not_started">Not Started</SelectItem>
                <SelectItem value="requires_payment_method">Requires Method</SelectItem>
                <SelectItem value="requires_confirmation">Requires Confirmation</SelectItem>
                <SelectItem value="requires_action">Requires Action</SelectItem>
                <SelectItem value="requires_capture">Requires Capture</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="succeeded">Succeeded</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto relative min-h-[400px]">
        {isPending && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50/50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-medium text-gray-500 whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  No payment queue results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
