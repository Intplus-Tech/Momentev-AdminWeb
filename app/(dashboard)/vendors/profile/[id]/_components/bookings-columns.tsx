"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BookingResponse } from "@/lib/actions/bookings";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  pending_payment: { label: "Pending Payment", color: "bg-orange-100 text-orange-800" },
  paid: { label: "Paid", color: "bg-blue-100 text-blue-800" },
  confirmed: { label: "Confirmed", color: "bg-green-100 text-green-800" },
  completed: { label: "Completed", color: "bg-emerald-100 text-emerald-800" },
  cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-800" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
};

export const columns: ColumnDef<BookingResponse>[] = [
  {
    accessorKey: "eventDetails.title",
    header: "Event",
    cell: ({ row }) => {
      const title = row.original.eventDetails?.title || "Untitled Event";
      const start = row.original.eventDetails?.startDate;
      return (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{title}</span>
          {start && (
            <span className="text-[11px] text-gray-500">
              {format(new Date(start), "MMM d, yyyy")}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "customerId",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.original.customerId;
      if (!customer) return <span className="text-gray-400 italic">Unknown</span>;
      return (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 capitalize">
            {customer.firstName} {customer.lastName}
          </span>
          <span className="text-[11px] text-gray-500 truncate max-w-[150px]">
            {customer.email}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "location.addressText",
    header: "Location",
    cell: ({ row }) => {
      const loc = row.original.location?.addressText;
      return <span className="text-gray-700">{loc || "—"}</span>;
    },
  },
  {
    accessorKey: "amounts.total",
    header: "Amount",
    cell: ({ row }) => {
      const amt = row.original.amounts?.total || 0;
      const cur = row.original.currency || "GBP";
      
      const formatCurrency = (amount: number, currencyCode: string) => {
        return new Intl.NumberFormat('en-GB', {
          style: 'currency',
          currency: currencyCode,
        }).format(amount);
      };

      return (
        <div className="flex flex-col">
           <span className="font-medium text-gray-900">{formatCurrency(amt, cur)}</span>
           <span className="text-[10px] text-gray-400 capitalize">{row.original.paymentModel?.replace(/_/g, " ")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status || "pending";
      const config = statusConfig[status] || { label: status, color: "bg-gray-100 text-gray-800" };
      
      return (
        <Badge variant="outline" className={`border-transparent font-medium shadow-none ${config.color} uppercase text-[10px] px-2 py-0.5 tracking-wider`}>
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const created = row.original.createdAt;
      return <span className="text-gray-500 whitespace-nowrap">{format(new Date(created), "MMM d, yyyy")}</span>;
    },
  },
];
