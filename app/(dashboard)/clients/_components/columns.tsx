"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ClientProfile } from "@/lib/actions/clients";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusStyles: Record<string, string> = {
  active: "bg-green-100 text-green-700 border-green-200",
  inactive: "bg-gray-100 text-gray-700 border-gray-200",
  banned: "bg-red-50 text-red-700 border-red-200",
  pending_verification: "bg-amber-50 text-amber-700 border-amber-200",
};

export const columns: ColumnDef<ClientProfile>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.getValue("_id") as string;
      return <span className="font-mono text-xs text-gray-500">#{id.slice(-6).toUpperCase()}</span>;
    },
  },
  {
    id: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const client = row.original;
      return (
        <div className="font-medium text-gray-900">
          {client.firstName} {client.lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <div className="text-gray-600 truncate max-w-[200px]">{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Account Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const style = statusStyles[status] || "bg-gray-50 text-gray-600 border-gray-200";

      return (
        <Badge variant="outline" className={`rounded-sm text-[10px] font-bold uppercase tracking-wider ${style}`}>
          {status.replace(/_/g, " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <span className="text-gray-600 capitalize">{row.getValue("role")}</span>,
  },
  {
    accessorKey: "lastLoginAt",
    header: "Last Login",
    cell: ({ row }) => {
      const lastLogin = row.getValue("lastLoginAt") as string | null;
      if (!lastLogin) return <span className="text-gray-500">Never</span>;
      
      const formatted = new Date(lastLogin).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      return <span className="text-gray-500">{formatted}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;

      return (
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
              onClick={() => navigator.clipboard.writeText(client._id)}
            >
              Copy client ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/clients/profile/${client._id}`}>View Profile</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
