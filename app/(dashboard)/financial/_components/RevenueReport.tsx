"use client";

import { useState, useTransition, useEffect } from "react";
import { getPlatformRevenue, PlatformRevenueResponse } from "@/lib/actions/finance";
import { DollarSign, Loader2, Calendar } from "lucide-react";

export default function RevenueReport() {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<PlatformRevenueResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year" | "all-time">("month");

  useEffect(() => {
    startTransition(async () => {
      setError(null);
      const result = await getPlatformRevenue(period);
      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || "Failed to load revenue data");
      }
    });
  }, [period]);

  const formatMoney = (minor: number) => {
      return (minor / 100).toLocaleString("en-GB", {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: 2,
      });
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
             <DollarSign className="h-5 w-5 text-emerald-500" />
             Revenue Report
          </h2>
          <p className="text-sm text-gray-500">Platform earnings and commissions.</p>
        </div>

        <select
           value={period}
           onChange={(e) => setPeriod(e.target.value as any)}
           disabled={isPending}
           className="text-sm border border-gray-200 rounded-md px-3 py-1.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
          <option value="all-time">All Time</option>
        </select>
      </div>

      {isPending ? (
          <div className="flex justify-center items-center py-12">
             <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
      ) : error ? (
          <div className="text-sm text-red-500 bg-red-50 p-4 rounded-md text-center">
              {error}
          </div>
      ) : data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-medium text-emerald-700 mb-1">Total Revenue</span>
                  <span className="text-3xl font-bold text-emerald-900">{formatMoney(data.totalRevenue)}</span>
              </div>
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-medium text-blue-700 mb-1">Total Commission</span>
                  <span className="text-3xl font-bold text-blue-900">{formatMoney(data.commission)}</span>
              </div>
          </div>
      ) : (
          <div className="text-sm text-gray-500 text-center py-8">No data available</div>
      )}
    </div>
  );
}
