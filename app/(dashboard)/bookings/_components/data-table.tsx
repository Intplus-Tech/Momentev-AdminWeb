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
import { Search, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseISO, format } from "date-fns";
import BookingDetailsModal from "./BookingDetailsModal";
import { AdminBookingItem } from "@/lib/actions/bookings";

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

  const currentStatus = searchParams.get("status") || "all";
  const currentFrom = searchParams.get("from") || "";
  const currentTo = searchParams.get("to") || "";

  // Modal state
  const [selectedBooking, setSelectedBooking] = React.useState<AdminBookingItem | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  // Local state for dates
  const [localFrom, setLocalFrom] = React.useState(currentFrom ? format(parseISO(currentFrom), 'yyyy-MM-dd') : "");
  const [localTo, setLocalTo] = React.useState(currentTo ? format(parseISO(currentTo), 'yyyy-MM-dd') : "");

  React.useEffect(() => {
    setLocalFrom(currentFrom ? format(parseISO(currentFrom), 'yyyy-MM-dd') : "");
    setLocalTo(currentTo ? format(parseISO(currentTo), 'yyyy-MM-dd') : "");
  }, [currentFrom, currentTo]);

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
      params.set("page", "1");
      
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const applyDateFilter = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (localFrom) {
        params.set("from", new Date(localFrom).toISOString());
      } else {
        params.delete("from");
      }
      if (localTo) {
        params.set("to", new Date(localTo).toISOString());
      } else {
        params.delete("to");
      }
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleRowClick = (row: TData) => {
    setSelectedBooking(row as unknown as AdminBookingItem);
    setModalOpen(true);
  };

  const hasActiveFilters = currentStatus !== "all" || currentFrom || currentTo;

  const clearAllFilters = () => {
    startTransition(() => {
      const params = new URLSearchParams();
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
      <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row gap-4 justify-between bg-gray-50/50">
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 hidden sm:inline">Status:</span>
            <Select
              value={currentStatus}
              onValueChange={(value) => handleFilterChange("status", value)}
              disabled={isPending}
            >
              <SelectTrigger className="w-[160px] h-9 bg-white">
                <SelectValue placeholder="Booking Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bookings</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="pending_payment">Pending Payment</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Filters (Basic HTML Date inputs pointing to 'from' and 'to') */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 hidden sm:inline">From: (Start Date)</span>
            <Input 
                type="date" 
                className="h-9 w-auto bg-white"
                value={localFrom}
                disabled={isPending}
                onChange={(e) => setLocalFrom(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 hidden sm:inline">To: (End Date)</span>
            <Input 
                type="date" 
                className="h-9 w-auto bg-white"
                disabled={isPending}
                value={localTo}
                onChange={(e) => setLocalTo(e.target.value)}
            />
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={applyDateFilter}
            disabled={isPending}
            className="h-9"
          >
            Apply
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              disabled={isPending}
              className="text-gray-500 hover:text-red-600 ml-2"
            >
              <X className="h-4 w-4 mr-1" />
              Clear Filters
            </Button>
          )}
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
                  className="hover:bg-gray-50/50 cursor-pointer"
                  onClick={() => handleRowClick(row.original)}
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
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <BookingDetailsModal
        booking={selectedBooking}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
