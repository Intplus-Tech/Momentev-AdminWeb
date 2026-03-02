"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CustomerRequest } from "@/lib/actions/customer-requests";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusStyles: Record<string, string> = {
  pending_approval: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-green-100 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  cancelled: "bg-gray-100 text-gray-700 border-gray-200",
};

export const columns: ColumnDef<CustomerRequest>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.getValue("_id") as string;
      return (
        <span className="font-mono text-xs text-gray-500">
          #{id}
        </span>
      );
    },
  },
  {
    id: "eventTitle",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-4"
      >
        Event Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const title = row.original.eventDetails?.title || "—";
      return (
        <div className="font-medium text-gray-900 max-w-[200px] truncate" title={title}>
          {title}
        </div>
      );
    },
  },
  {
    id: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.original.customerId;
      return (
        <div>
          <div className="font-medium text-gray-900">
            {customer?.firstName} {customer?.lastName}
          </div>
          <div className="text-xs text-gray-500 truncate max-w-[180px]">
            {customer?.email}
          </div>
        </div>
      );
    },
  },
  {
    id: "category",
    header: "Category",
    cell: ({ row }) => {
      const name = row.original.serviceCategoryId?.name || "—";
      return <span className="text-gray-600 capitalize">{name}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const style =
        statusStyles[status] || "bg-gray-50 text-gray-600 border-gray-200";
      return (
        <Badge
          variant="outline"
          className={`rounded-sm text-[10px] font-bold uppercase tracking-wider ${style}`}
        >
          {status.replace(/_/g, " ")}
        </Badge>
      );
    },
  },
  {
    id: "guestCount",
    header: "Guests",
    cell: ({ row }) => {
      const count = row.original.eventDetails?.guestCount;
      return (
        <span className="text-gray-600">
          {count != null ? count.toLocaleString() : "—"}
        </span>
      );
    },
  },
  {
    id: "location",
    header: "Location",
    cell: ({ row }) => {
      const location = row.original.eventDetails?.location || "—";
      return (
        <span className="text-gray-600 truncate max-w-[140px] block" title={location}>
          {location}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      if (!date) return <span className="text-gray-500">—</span>;
      return (
        <span className="text-gray-500">
          {new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const request = row.original;
      return (
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(request._id)}
              >
                Copy request ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(request.customerId?._id || "")
                }
              >
                Copy customer ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
