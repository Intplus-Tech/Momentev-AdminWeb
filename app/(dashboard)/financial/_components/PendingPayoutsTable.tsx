"use client";

import Link from "next/link";
import { useState, useTransition, useEffect } from "react";
import { getPendingPayouts, PendingPayoutsResponse } from "@/lib/actions/finance";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, Clock, ChevronLeft, ChevronRight } from "lucide-react";

export default function PendingPayoutsTable() {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<PendingPayoutsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 5;

  const payouts = Array.isArray(data?.data) ? data.data : [];
  const totalPages = data ? Math.ceil(data.total / limit) : 1;

  const toSafeNumber = (value: unknown) => {
    const parsed = typeof value === "number" ? value : Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const normalizeCurrency = (value?: string) => {
    const normalized = (value || "GBP").trim().toUpperCase();
    if (normalized === "ANY") return "GBP";
    return /^[A-Z]{3}$/.test(normalized) ? normalized : "GBP";
  };

  useEffect(() => {
    startTransition(async () => {
      setError(null);
      const result = await getPendingPayouts(page, limit);

      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || "Failed to load pending payouts");
      }
    });
  }, [page]);

  const formatMoney = (minor: number, currency: string = "GBP") => {
    return (toSafeNumber(minor) / 100).toLocaleString("en-GB", {
      style: "currency",
      currency: normalizeCurrency(currency),
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (dateStr: string) => {
    const parsedDate = new Date(dateStr);
    if (Number.isNaN(parsedDate.getTime())) return "-";
    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };



  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
      <div className="p-6 border-b border-gray-100 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            Pending Payouts
          </h2>
          <p className="text-sm text-gray-500">
            Vendor payouts awaiting release. Total: {data?.total || 0}
          </p>
        </div>
        <Link href="/admin/payouts/pending">
          <Button variant="outline" size="sm" className="shrink-0">
            View All
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        {isPending ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 p-6 text-red-600 bg-red-50">
            <AlertCircle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        ) : payouts.length > 0 ? (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-3">Vendor</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payouts.map((payout) => (
                <tr key={payout.bookingId} className="hover:bg-gray-50/50 transition-colors bg-white">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {payout.vendor?.businessName || "Unknown Vendor"}
                  </td>
                  <td className="px-6 py-4 font-semibold text-emerald-600">
                    {formatMoney(payout.vendorPayoutMinor, payout.currency)}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {formatDate(payout.paidAt)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 capitalize">
                      {(payout.bookingStatus || "pending").replace(/_/g, " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center text-gray-500">
            No pending payouts found.
          </div>
        )}
      </div>

      {data && data.total > limit && (
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 bg-gray-50/50">
          <div>
            Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(page * limit, data.total)}
            </span>{" "}
            of <span className="font-medium">{data.total}</span> results
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isPending}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || isPending}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
