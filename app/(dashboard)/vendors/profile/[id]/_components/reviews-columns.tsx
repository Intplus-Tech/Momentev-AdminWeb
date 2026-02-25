"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ReviewResponse } from "@/lib/actions/reviews";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export const columns: ColumnDef<ReviewResponse>[] = [
  {
    accessorKey: "reviewer",
    header: "Reviewer",
    cell: ({ row }) => {
      const reviewer = row.original.reviewer;
      const initials = `${reviewer?.firstName?.[0] || ""}${reviewer?.lastName?.[0] || ""}`;

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={reviewer?.avatar} alt={reviewer?.firstName} />
            <AvatarFallback className="text-xs bg-gray-100 text-gray-600">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">
              {reviewer?.firstName} {reviewer?.lastName}
            </span>
          </div>
        </div>
      );
    },
    // Custom filter function for the global search
    filterFn: (row, id, value) => {
      const reviewer = row.original.reviewer;
      const searchStr = value.toLowerCase();
      return (
        reviewer?.firstName?.toLowerCase().includes(searchStr) ||
        reviewer?.lastName?.toLowerCase().includes(searchStr) ||
        false
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.original.rating;
      
      return (
        <div className="flex items-center gap-1">
          <span className="font-medium text-gray-900 w-4">{rating}</span>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-100 text-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      );
    },
    // For sorting ratings numerically
    sortingFn: "basic",
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => {
      const comment = row.original.comment;
      return (
        <div className="max-w-[400px]">
          <p className="text-gray-600 text-sm truncate" title={comment}>
            {comment || "No comment provided."}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return (
        <span className="text-gray-500 text-sm whitespace-nowrap">
          {format(new Date(row.original.createdAt), "MMM d, yyyy")}
        </span>
      );
    },
    // Help sort by date
    sortingFn: "datetime",
  },
];
