"use client";

import { useState, useTransition, useEffect } from "react";
import { getPendingPayouts, PendingPayoutsResponse } from "@/lib/actions/finance";
import { Loader2, AlertCircle, Clock } from "lucide-react";

export default function PendingPayoutsTable() {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<PendingPayoutsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const payouts = Array.isArray(data?.payouts) ? data.payouts : [];

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
      const result = await getPendingPayouts();

      console.log("Pending Payouts Result:", result); // Debug log to inspect the result structure
      if (result.success && result.data) {
        const safePayouts = Array.isArray(result.data.payouts) ? result.data.payouts : [];
        setData({
          payouts: safePayouts,
          total: typeof result.data.total === "number" ? result.data.total : safePayouts.length,
        });
      } else {
        setError(result.error || "Failed to load pending payouts");
      }
    });
  }, []);

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

  console.log("Rendering PendingPayoutsTable with data:", data, "and error:", error); // Debug log to trace rendering

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-amber-500" />
          Pending Payouts
        </h2>
        <p className="text-sm text-gray-500">
          Vendor payouts awaiting release. Total: {data?.total || 0}
        </p>
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
                <tr key={payout._id} className="hover:bg-gray-50/50 transition-colors bg-white">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {payout.vendorId?.businessName || "Unknown Vendor"}
                  </td>
                  <td className="px-6 py-4 font-semibold text-emerald-600">
                    {formatMoney(payout.amountMinor, payout.currency)}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {formatDate(payout.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 capitalize">
                      {payout.status.replace(/_/g, " ")}
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
    </div>
  );
}
