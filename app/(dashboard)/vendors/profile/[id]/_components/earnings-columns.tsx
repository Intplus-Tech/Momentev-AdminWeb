"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EarningResponse } from "@/lib/actions/earnings";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

// Helper to format stripe amounts (which are in cents)
const formatAmount = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
};

export const columns: ColumnDef<EarningResponse>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type;
      
      return (
        <Badge variant="outline" className="font-medium text-gray-700 bg-gray-50 uppercase text-[10px]">
          {type.replace(/_/g, " ")}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "amount",
    header: "Gross Amount",
    cell: ({ row }) => {
      return (
        <span className="font-semibold text-gray-900">
          {formatAmount(row.original.amount, row.original.currency)}
        </span>
      );
    },
    sortingFn: "basic",
  },
  {
    accessorKey: "fee",
    header: "Fees",
    cell: ({ row }) => {
      const fee = row.original.fee;
      if (fee === 0) return <span className="text-gray-400">-</span>;
      
      return (
        <span className="text-red-600 font-medium">
          -{formatAmount(fee, row.original.currency)}
        </span>
      );
    },
    sortingFn: "basic",
  },
  {
    accessorKey: "net",
    header: "Net Earnings",
    cell: ({ row }) => {
      const net = row.original.net;
      
      return (
        <span className="font-bold text-green-600">
          {formatAmount(net, row.original.currency)}
        </span>
      );
    },
    sortingFn: "basic",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      let variant = "outline";
      let className = "";

      switch (status) {
        case "available":
          variant = "secondary";
          className = "bg-green-100 text-green-700 hover:bg-green-100 border-transparent";
          break;
        case "pending":
          variant = "secondary";
          className = "bg-orange-100 text-orange-700 hover:bg-orange-100 border-transparent";
          break;
        default:
          variant = "secondary";
          className = "bg-gray-100 text-gray-700 hover:bg-gray-100 border-transparent";
      }

      return (
        <Badge variant={variant as any} className={`capitalize ${className}`}>
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "available_on",
    header: "Available On",
    cell: ({ row }) => {
      // Stripe timestamps are in seconds, date-fns expects milliseconds
      const date = new Date(row.original.available_on * 1000);
      return (
        <span className="text-gray-500 text-sm whitespace-nowrap">
          {format(date, "MMM d, yyyy")}
        </span>
      );
    },
    sortingFn: "basic", // we can sort standard numbers
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => {
      // Stripe timestamps are in seconds
      const date = new Date(row.original.created * 1000);
      return (
        <div className="flex flex-col">
          <span className="text-gray-900 text-sm whitespace-nowrap">
            {format(date, "MMM d, yyyy")}
          </span>
          <span className="text-gray-500 text-xs">
            {format(date, "h:mm a")}
          </span>
        </div>
      );
    },
    sortingFn: "basic",
  },
  {
    id: "actions",
    header: "",
    cell: ({ row, table }) => {
      const earning = row.original;
      const meta = table.options.meta as any;

      return (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-gray-900"
          onClick={() => meta?.onViewDetails?.(earning)}
          title="View earning details"
        >
          <Eye className="h-4 w-4" />
        </Button>
      );
    },
  },
];
