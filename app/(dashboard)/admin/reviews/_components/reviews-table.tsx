"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { format } from "date-fns";
import { flagReview, deleteReview } from "@/lib/actions/admin-reviews";
import type { Review } from "@/types/review";

type Props = {
  reviews: Review[];
};

export default function ReviewsTable({ reviews }: Props) {
  const queryClient = useQueryClient();
  const [deleting, setDeleting] = useState<Review | null>(null);

  const flagMutation = useMutation({
    mutationFn: async ({ id, isFlagged }: { id: string; isFlagged: boolean }) => {
      const res = await flagReview(id, isFlagged);
      if (!res.success) throw new Error(res.error || "Failed to flag review");
      return res.data;
    },
    onSuccess: async () => {
      toast.success("Review flag updated");
      await queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to update flag");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteReview(id);
      if (!res.success) throw new Error(res.error || "Failed to delete review");
      return res.data;
    },
    onSuccess: async () => {
      toast.success("Review deleted");
      setDeleting(null);
      await queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to delete review");
    },
  });

  const handleToggleFlag = async (review: Review) => {
    await flagMutation.mutateAsync({ id: review._id, isFlagged: !review.isFlagged });
  };

  const handleDeleteConfirm = async () => {
    if (!deleting) return;
    await deleteMutation.mutateAsync(deleting._id);
  };

  const rows = reviews.length === 0
    ? [
      (
        <TableRow key="empty">
          <TableCell colSpan={7} className="py-16 text-center text-gray-500">
            No reviews found.
          </TableCell>
        </TableRow>
      ),
    ]
    : reviews.map((r) => {
      const reviewerName = typeof r.reviewerUserId === "string"
        ? r.reviewerUserId
        : `${r.reviewerUserId?.firstName ?? ""} ${r.reviewerUserId?.lastName ?? ""}`.trim();

      const vendorObj = r.vendorId as any;
      const vendorName = typeof r.vendorId === "string"
        ? r.vendorId
        : vendorObj?.businessProfile?.businessName
        || vendorObj?.userId?.businessProfile?.businessName
        || vendorObj?.businessProfile?.name
        || vendorObj?.name
        || vendorObj?.id
        || vendorObj?._id
        || "—";

      return (
        <TableRow key={r._id} className="hover:bg-gray-50/50">
          <TableCell className="align-top">{format(new Date(r.createdAt), "MMM dd, yyyy")}</TableCell>
          <TableCell className="align-top">{reviewerName || "—"}</TableCell>
          <TableCell className="align-top">{vendorName}</TableCell>
          <TableCell className="align-top">{Array.from({ length: r.rating }).map(() => "★").join("")} ({r.rating})</TableCell>
          <TableCell className="align-top max-w-xs truncate" title={r.comment}>{r.comment || "—"}</TableCell>
          <TableCell className="align-top">
            <div className="flex items-center gap-2">
              {r.isFlagged && <Badge variant="destructive">Flagged</Badge>}
              {r.isEdited && <Badge variant="secondary">Edited</Badge>}
            </div>
          </TableCell>
          <TableCell className="align-top text-right">
            <div className="flex items-center justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => handleToggleFlag(r)}>
                    {r.isFlagged ? "Unflag" : "Flag"}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setDeleting(r)}
                    data-variant="destructive"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TableCell>
        </TableRow>
      );
    });

  return (
    <div className="rounded-xl border shadow-sm bg-white overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50/60">
          <TableRow>
            <TableHead className="whitespace-nowrap">Date</TableHead>
            <TableHead className="whitespace-nowrap">Customer</TableHead>
            <TableHead className="whitespace-nowrap">Vendor</TableHead>
            <TableHead className="whitespace-nowrap">Rating</TableHead>
            <TableHead className="whitespace-nowrap">Comment</TableHead>
            <TableHead className="whitespace-nowrap">Status</TableHead>
            <TableHead className="whitespace-nowrap text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{rows}</TableBody>
      </Table>

      <AlertDialog open={!!deleting} onOpenChange={(open) => { if (!open) setDeleting(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete review?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure? This violates TOS and permanently removes the review.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
