"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PaymentQueueItem } from "@/lib/actions/finance";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const columns: ColumnDef<PaymentQueueItem>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const dateStr = row.getValue("createdAt") as string;
      return (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">
            {format(new Date(dateStr), "MMM dd, yyyy")}
          </span>
          <span className="text-xs text-gray-500">
            {format(new Date(dateStr), "h:mm a")}
          </span>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.vendor?.businessName,
    id: "vendor",
    header: "Vendor",
    cell: ({ row }) => {
      const vendorName = row.original.vendor?.businessName || "Unknown Vendor";
      const ownerName = row.original.vendor?.owner 
        ? `${row.original.vendor.owner.firstName} ${row.original.vendor.owner.lastName}`
        : "";
      return (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 line-clamp-1" title={vendorName}>
            {vendorName}
          </span>
          {ownerName && <span className="text-xs text-gray-500 line-clamp-1">{ownerName}</span>}
        </div>
      );
    },
  },
  {
    accessorFn: (row) => `${row.customer?.firstName} ${row.customer?.lastName}`,
    id: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.original.customer;
      if (!customer) return <span className="text-gray-400">Unknown</span>;
      return (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 line-clamp-1">
            {customer.firstName} {customer.lastName}
          </span>
          <span className="text-xs text-gray-500 line-clamp-1">{customer.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amountMinor",
    header: "Amount",
    cell: ({ row }) => {
      const minor = row.getValue("amountMinor") as number;
      const currency = row.original.currency || "GBP";
      const formatted = (minor / 100).toLocaleString("en-GB", {
        style: "currency",
        currency: currency,
      });
      return <div className="font-semibold">{formatted}</div>;
    },
  },
  {
    accessorFn: (row) => row.status?.queue,
    id: "queueStatus",
    header: "Queue Status",
    cell: ({ row }) => {
      const status = row.original.status?.queue || "unknown";
      
      let badgeClass = "bg-gray-100 text-gray-800 hover:bg-gray-100";
      if (status === "success") badgeClass = "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 shadow-sm border border-emerald-200";
      else if (status === "pending") badgeClass = "bg-amber-100 text-amber-800 hover:bg-amber-100 shadow-sm border border-amber-200";
      else if (status === "failed" || status === "refunded") badgeClass = "bg-red-100 text-red-800 hover:bg-red-100 shadow-sm border border-red-200";

      return (
        <Badge variant="outline" className={`capitalize font-medium ${badgeClass}`}>
          {status.replace(/_/g, " ")}
        </Badge>
      );
    },
  },
  {
    accessorFn: (row) => row.status?.booking,
    id: "bookingStatus",
    header: "Booking Status",
    cell: ({ row }) => {
      const status = row.original.status?.booking || "unknown";
      
      let badgeClass = "bg-gray-100 text-gray-800 hover:bg-gray-100";
      if (status === "confirmed" || status === "paid" || status === "completed") badgeClass = "bg-emerald-100 text-emerald-800 hover:bg-emerald-100";
      else if (status === "pending_payment") badgeClass = "bg-blue-100 text-blue-800 hover:bg-blue-100";
      else if (status === "cancelled" || status === "rejected") badgeClass = "bg-red-100 text-red-800 hover:bg-red-100";

      return (
        <Badge variant="secondary" className={`capitalize ${badgeClass}`}>
          {status.replace(/_/g, " ")}
        </Badge>
      );
    },
  },
  {
    accessorFn: (row) => row.status?.payment,
    id: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.original.status?.payment || "unknown";
      
      let badgeClass = "text-gray-500 bg-gray-50 border border-gray-200 hover:bg-gray-100";
      if (status === "succeeded") badgeClass = "text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100";
      else if (status === "processing") badgeClass = "text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100";
      else if (status.startsWith("requires_")) badgeClass = "text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100";
      else if (status === "canceled") badgeClass = "text-red-700 bg-red-50 border border-red-200 hover:bg-red-100";

      return (
        <Badge variant="outline" className={`whitespace-nowrap capitalize text-[11px] ${badgeClass}`}>
          {status.replace(/_/g, " ")}
        </Badge>
      );
    },
  }
];
