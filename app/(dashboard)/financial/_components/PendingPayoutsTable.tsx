"use client";

import { useState, useTransition, useEffect } from "react";
import { getPendingPayouts, PendingPayoutsResponse } from "@/lib/actions/finance";
import { Loader2, AlertCircle, Clock } from "lucide-react";

export default function PendingPayoutsTable() {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<PendingPayoutsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startTransition(async () => {
      setError(null);
      const result = await getPendingPayouts();
      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || "Failed to load pending payouts");
      }
    });
  }, []);

  const formatMoney = (minor: number, currency: string = "GBP") => {
    return (minor / 100).toLocaleString("en-GB", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

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
        ) : data && data.payouts.length > 0 ? (
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
              {data.payouts.map((payout) => (
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
