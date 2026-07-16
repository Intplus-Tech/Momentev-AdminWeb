"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchPendingPayouts, releaseVendorPayout } from "@/lib/actions/admin-payouts";
import type { PendingPayoutItem } from "@/types/admin";
import { format } from "date-fns";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  Banknote,
} from "lucide-react";
import { toast } from "sonner";

type PendingPayoutsClientProps = {
  initialPage?: number;
  initialLimit?: number;
};

const normalizeCurrency = (value?: string) => {
  const normalized = (value || "GBP").trim().toUpperCase();
  return /^[A-Z]{3}$/.test(normalized) ? normalized : "GBP";
};

const toSafeNumber = (value: unknown) => {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatCurrency = (minorValue: number, currencyCode?: string) => {
  return (toSafeNumber(minorValue) / 100).toLocaleString("en-GB", {
    style: "currency",
    currency: normalizeCurrency(currencyCode),
    maximumFractionDigits: 2,
  });
};

const formatDate = (value?: string) => {
  if (!value) return "-";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? "-" : format(parsed, "MMM dd, yyyy");
};

export default function PendingPayoutsClient({
  initialPage = 1,
  initialLimit = 20,
}: PendingPayoutsClientProps) {
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [selectedPayout, setSelectedPayout] = useState<PendingPayoutItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const pendingPayoutsQuery = useQuery({
    queryKey: ["admin-pending-payouts", page, limit],
    queryFn: async () => {
      const result = await fetchPendingPayouts(page, limit);
      if (!result.success || !result.data) {
        throw new Error(result.error || "Failed to fetch pending payouts");
      }
      return result.data;
    },
  });

  const releaseMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      const result = await releaseVendorPayout(bookingId);
      if (!result.success) {
        throw new Error(result.error || "Failed to release payout");
      }
      return result.data;
    },
    onSuccess: async () => {
      toast.success("Payout released successfully.");
      setDialogOpen(false);
      setSelectedPayout(null);
      await queryClient.invalidateQueries({ queryKey: ["admin-pending-payouts"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to release payout");
    },
  });

  const payouts = pendingPayoutsQuery.data?.data || [];
  const total = pendingPayoutsQuery.data?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const selectedAmount = selectedPayout ? formatCurrency(selectedPayout.vendorPayoutMinor, selectedPayout.currency) : "";

  const handleReleaseClick = async () => {
    if (!selectedPayout) return;
    await releaseMutation.mutateAsync(selectedPayout.bookingId);
  };

  const canGoPrevious = page > 1 && !pendingPayoutsQuery.isLoading;
  const canGoNext = page < totalPages && !pendingPayoutsQuery.isLoading;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            Pending Payouts
          </h2>
          <p className="text-sm text-gray-500">
            {total.toLocaleString()} payout{total === 1 ? "" : "s"} awaiting release.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Banknote className="h-4 w-4" />
          Page {page} of {totalPages}
        </div>
      </div>

      {pendingPayoutsQuery.isError ? (
        <div className="flex items-center gap-2 p-6 text-red-600 bg-red-50">
          <AlertCircle className="h-5 w-5" />
          <span>
            {pendingPayoutsQuery.error instanceof Error
              ? pendingPayoutsQuery.error.message
              : "Failed to load pending payouts"}
          </span>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/60">
                  <TableHead className="whitespace-nowrap">Vendor Name</TableHead>
                  <TableHead className="whitespace-nowrap">Customer</TableHead>
                  <TableHead className="whitespace-nowrap">Completion Date</TableHead>
                  <TableHead className="whitespace-nowrap">Net Payout Amount</TableHead>
                  <TableHead className="whitespace-nowrap text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingPayoutsQuery.isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-16 text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-500">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading pending payouts...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : payouts.length > 0 ? (
                  payouts.map((payout) => {
                    const customerName = `${payout.customer?.firstName || ""} ${payout.customer?.lastName || ""}`.trim() || "Unknown Customer";
                    const netAmount = formatCurrency(payout.vendorPayoutMinor, payout.currency);

                    return (
                      <TableRow key={payout.bookingId} className="hover:bg-gray-50/50">
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">{payout.vendor?.businessName || "Unknown Vendor"}</span>
                            <span className="text-xs text-gray-500">
                              {payout.vendor?.owner?.email || "No vendor owner email"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{customerName}</TableCell>
                        <TableCell className="text-gray-600">{formatDate(payout.paidAt)}</TableCell>
                        <TableCell className="font-semibold text-emerald-600">{netAmount}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedPayout(payout);
                              setDialogOpen(true);
                            }}
                            disabled={releaseMutation.isPending}
                          >
                            Release Funds
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="py-16 text-center text-gray-500">
                      No pending payouts found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 bg-gray-50/40 px-6 py-4">
            <p className="text-sm text-gray-500">
              Showing {payouts.length ? (page - 1) * limit + 1 : 0} to {Math.min(page * limit, total)} of {total.toLocaleString()} results
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={!canGoPrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={!canGoNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Release vendor payout?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedPayout
                ? `Are you sure you want to release ${selectedAmount} to ${selectedPayout.vendor?.businessName || "this vendor"}?`
                : "Are you sure you want to release this payout?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setSelectedPayout(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <Button
              onClick={handleReleaseClick}
              disabled={releaseMutation.isPending || !selectedPayout}
              className="gap-2"
            >
              {releaseMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Releasing...
                </>
              ) : (
                "Release Funds"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}