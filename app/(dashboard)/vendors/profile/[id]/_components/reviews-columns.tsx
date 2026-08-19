"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Star, MoreHorizontal, Flag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ReviewResponse } from "@/lib/actions/reviews";
import { deleteReview, flagReview } from "@/lib/actions/admin-reviews";

type ReviewActionsCellProps = {
  review: ReviewResponse;
  onChanged: () => void;
};

function ReviewActionsCell({ review, onChanged }: ReviewActionsCellProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const isFlagged = !!review.isFlagged;

  const flagMutation = useMutation({
    mutationFn: async () => {
      const result = await flagReview(review._id, !isFlagged);
      if (!result.success) {
        throw new Error(result.error || "Failed to update review flag");
      }
      return result.data;
    },
    onSuccess: () => {
      toast.success(isFlagged ? "Review unflagged" : "Review flagged");
      onChanged();
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to update review flag");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const result = await deleteReview(review._id);
      if (!result.success) {
        throw new Error(result.error || "Failed to delete review");
      }
      return result.data;
    },
    onSuccess: () => {
      toast.success("Review deleted");
      setDeleteOpen(false);
      onChanged();
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to delete review");
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open review actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => flagMutation.mutate()}>
            <Flag className="mr-2 h-4 w-4" />
            {isFlagged ? "Unflag" : "Flag"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              setDeleteOpen(true);
            }}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this review?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the review from the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export function getReviewColumns(onChanged: () => void): ColumnDef<ReviewResponse>[] {
  return [
    {
      accessorKey: "reviewer",
      header: "Reviewer",
      cell: ({ row }) => {
        const reviewer = row.original.reviewer;
        const initials = `${reviewer?.firstName?.[0] || ""}${reviewer?.lastName?.[0] || ""}`;

        return (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">
              {initials || "--"}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">
                {reviewer?.firstName} {reviewer?.lastName}
              </span>
            </div>
          </div>
        );
      },
      filterFn: (row, _id, value) => {
        const reviewer = row.original.reviewer;
        const searchStr = String(value).toLowerCase();
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
                  className={`h-4 w-4 ${star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-100 text-gray-200"
                    }`}
                />
              ))}
            </div>
            {row.original.isFlagged && (
              <Badge variant="destructive" className="ml-2">
                Flagged
              </Badge>
            )}
          </div>
        );
      },
      sortingFn: "basic",
    },
    {
      accessorKey: "comment",
      header: "Comment",
      cell: ({ row }) => {
        const comment = row.original.comment;
        return (
          <div className="max-w-100">
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
      sortingFn: "datetime",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <ReviewActionsCell review={row.original} onChanged={onChanged} />,
    },
  ];
}