"use client";

import { useEffect, useState } from "react";
import { getClientOverview, CustomerProfileOverview } from "@/lib/actions/clients";

interface Props {
  clientId: string;
}

const formatAmount = (minorValue: number, currencyCode: string = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(minorValue / 100);
};

export default function ClientPerformanceMetrics({ clientId }: Props) {
  const [data, setData] = useState<CustomerProfileOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getClientOverview(clientId);
        if (res.success && res.data) {
          setData(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [clientId]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[100px] border border-gray-100 bg-gray-50 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.02)]"></div>
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 border border-dashed border-gray-200 rounded-xl text-center text-gray-500 text-sm">
        Performance data unavailable
      </div>
    );
  }

  const { performanceMetrics, currency } = data;

  const metrics: { label: string; value: string; sub?: string }[] = [
    { label: "Total Bookings", value: performanceMetrics.totalBookings.toString() },
    { label: "Total Spend", value: formatAmount(performanceMetrics.totalSpendMinor, currency) },
    { label: "Avg. Booking Value", value: formatAmount(performanceMetrics.averageBookingValueMinor, currency) },
    { label: "Repeat Rate", value: `${performanceMetrics.repeatRatePct}%` },
    { label: "Disputes", value: performanceMetrics.disputes.toString() },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {metrics.map((m, i) => (
        <div key={i} className="p-4 border rounded-xl border-gray-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[100px]">
          <p className="text-[12px] font-semibold text-gray-900 mb-2">{m.label}</p>
          <div>
            <p className="text-2xl font-bold text-gray-900">{m.value}</p>
            {m.sub && <p className="text-[10px] text-gray-500 font-medium mt-1">{m.sub}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
