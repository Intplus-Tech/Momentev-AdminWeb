"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AdminBookingItem } from "@/lib/actions/bookings";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const columns: ColumnDef<AdminBookingItem>[] = [
  {
    accessorKey: "eventDetails.title",
    header: "Event",
    cell: ({ row }) => {
      const title = row.original.eventDetails?.title || "Unknown Event";
      const start = row.original.eventDetails?.startDate;
      const end = row.original.eventDetails?.endDate;
      
      let dateRange = "No Date";
      if (start) {
          dateRange = format(new Date(start), "MMM dd, yyyy");
      }
      return (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 line-clamp-1" title={title}>
            {title}
          </span>
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {dateRange} - {row.original.eventDetails?.guestCount || 0} Guests
          </span>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.vendorId?.businessProfile || "Unknown Vendor",
    id: "vendor",
    header: "Vendor ID", // In your JSON the vendor businessName is not populated well, mostly just the ID. 
    cell: ({ row }) => {
      // The provided response doesn't populate vendor details nicely in this array structure (sometimes just ID). 
      // We'll show the ID or businessName if available.
      const vendorName = row.original.vendorId?.businessProfile || row.original.vendorId?.id || "Unknown Vendor";
      return (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 line-clamp-1">
            {vendorName}
          </span>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => `${row.customerId?.firstName || ""} ${row.customerId?.lastName || ""}`,
    id: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.original.customerId;
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
    accessorKey: "amounts.total",
    header: "Amount",
    cell: ({ row }) => {
      const total = row.original.amounts?.total || 0;
      const currency = row.original.currency || "GBP";
      const formatted = total.toLocaleString("en-GB", {
        style: "currency",
        currency: currency,
      });
      return <div className="font-semibold">{formatted}</div>;
    },
  },
  {
    accessorFn: (row) => row.status,
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status || "unknown";
      
      let badgeClass = "bg-gray-100 text-gray-800 hover:bg-gray-100 border border-gray-200";
      if (status === "confirmed" || status === "paid" || status === "completed") badgeClass = "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 shadow-sm";
      else if (status === "pending_payment" || status === "active" || status === "pending") badgeClass = "bg-blue-100 text-blue-800 hover:bg-blue-100 border border-blue-200 shadow-sm";
      else if (status === "cancelled" || status === "rejected") badgeClass = "bg-red-100 text-red-800 hover:bg-red-100 border border-red-200 shadow-sm";

      return (
        <Badge variant="outline" className={`capitalize font-medium ${badgeClass}`}>
          {status.replace(/_/g, " ")}
        </Badge>
      );
    },
  },
  {
    accessorFn: (row) => row.paymentModel,
    id: "paymentModel",
    header: "Payment Model",
    cell: ({ row }) => {
      const model = row.original.paymentModel || "unknown";
      return (
        <span className="text-sm text-gray-600 capitalize">
            {model.replace(/_/g, " ")}
        </span>
      );
    },
  }
];
