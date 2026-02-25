"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CustomerReviewResponse } from "@/lib/actions/reviews";
import { format } from "date-fns";
import { Star, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<CustomerReviewResponse>[] = [
  {
    accessorKey: "vendorId",
    header: "Vendor",
    cell: ({ row }) => {
      const vendor = row.original.vendorId;
      if (!vendor) return <span className="text-gray-400 text-sm">Unknown Vendor</span>;
      
      const initials = "V"; // We don't have a name in this payload
      const fullName = vendor.id || vendor._id || 'Unknown Vendor';
      
      return (
        <div className="flex items-center gap-3 py-1">
          <Avatar className="h-9 w-9 border border-gray-100 shadow-sm">
            <AvatarImage src={vendor.profilePhoto as string | undefined} alt="Vendor" />
            <AvatarFallback className="bg-red-50 text-red-700 font-semibold text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 text-sm">Vendor ID: {fullName.slice(0, 8)}...</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.original.rating;
      return (
        <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full w-fit border border-amber-100">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="text-sm font-bold text-amber-700">{rating.toFixed(1)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "comment",
    header: "Review Comment",
    cell: ({ row }) => {
      const comment = row.original.comment;
      return (
        <div className="flex items-start gap-2 max-w-[400px]">
          <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
          <p className="text-sm text-gray-600 line-clamp-2 md:line-clamp-3 leading-relaxed" title={comment}>
            {comment || <span className="text-gray-400 italic">No comment provided</span>}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Posted",
    cell: ({ row }) => {
      try {
        const date = new Date(row.original.createdAt);
        return (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              {format(date, "MMM d, yyyy")}
            </span>
            <span className="text-xs text-gray-500">
              {format(date, "h:mm a")}
            </span>
          </div>
        );
      } catch {
        return <span className="text-sm text-gray-500">Unknown Date</span>;
      }
    },
  },
];
