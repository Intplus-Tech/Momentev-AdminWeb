"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface TrendsChartProps {
  chartData?: Array<{
    periodStart: string;
    bookingsCount: number;
    revenueMinor: number;
    commissionMinor: number;
  }>;
}

export default function TrendsChart({ chartData = [] }: TrendsChartProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [metric, setMetric] = useState<"revenue" | "commission" | "bookings">("revenue");

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      if (key === "from") {
        params.set(key, `${value}T00:00:00.000Z`);
      } else if (key === "to") {
        params.set(key, `${value}T23:59:59.999Z`);
      } else {
        params.set(key, value);
      }
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const currentPeriod = searchParams.get("period") || "day";
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");
  
  const fromDateValue = fromParam ? fromParam.split("T")[0] : "";
  const toDateValue = toParam ? toParam.split("T")[0] : "";

  const data = useMemo(() => {
    if (!chartData || chartData.length === 0) return [];
    
    // Sort chronologically to ensure left-to-right timeline
    const sorted = [...chartData].sort(
      (a, b) => new Date(a.periodStart).getTime() - new Date(b.periodStart).getTime()
    );

    return sorted.map(item => {
      const d = new Date(item.periodStart);
      const label = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      return {
        label,
        revenue: item.revenueMinor / 100, // Convert to major units
        commission: item.commissionMinor / 100,
        bookings: item.bookingsCount,
        fullDate: item.periodStart
      };
    });
  }, [chartData]);

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-700">Booking Trends</h3>
          <select 
            className="border rounded-lg px-2 py-1 text-sm text-gray-600 bg-gray-50 outline-none font-medium cursor-pointer"
            value={metric}
            onChange={(e) => setMetric(e.target.value as any)}
          >
            <option value="revenue">Gross Revenue</option>
            <option value="commission">Commission</option>
            <option value="bookings">Total Bookings</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input 
            type="date" 
            className="border rounded-lg px-3 py-2 text-sm text-gray-500 outline-none w-[130px]"
            value={fromDateValue}
            max={toDateValue || undefined}
            onChange={(e) => handleFilterChange("from", e.target.value)}
          />
          <span className="text-gray-400 hidden sm:inline">-</span>
          <input 
            type="date" 
            className="border rounded-lg px-3 py-2 text-sm text-gray-500 outline-none w-[130px]"
            value={toDateValue}
            min={fromDateValue || undefined}
            onChange={(e) => handleFilterChange("to", e.target.value)}
          />
          <select 
            className="border rounded-lg px-4 py-2 text-sm text-gray-500 outline-none"
            value={currentPeriod}
            onChange={(e) => handleFilterChange("period", e.target.value)}
          >
            <option value="day">Daily</option>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>
        </div>
      </div>

      {/* CHART */}
      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            {/* GRID */}
            <CartesianGrid vertical horizontal={false} stroke="#EEF0F3" />

            {/* X AXIS */}
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9AA0A6", fontSize: 12 }}
            />

            {/* Y AXIS */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => metric === "bookings" ? v : `£${v >= 1000 ? v / 1000 + 'k' : v}`}
              tick={{ fill: "#9AA0A6", fontSize: 12 }}
            />

            {/* TOOLTIP */}
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload?.length) {
                  const val = payload[0].value as number;
                  const formattedVal = metric === "bookings" ? val.toLocaleString() : `£${val.toLocaleString()}`;
                  return (
                    <div className="bg-blue-500 text-white text-xs px-3 py-1 rounded-lg shadow-lg">
                      {formattedVal} ({payload[0].payload.label})
                    </div>
                  );
                }
                return null;
              }}
              cursor={{
                stroke: "#3B82F6",
                strokeDasharray: "4 4",
              }}
            />

            {/* LINE */}
            <Line
              type="monotone"
              dataKey={metric}
              stroke="#2196F3"
              strokeWidth={3}
              dot={({ cx, cy, payload, index }) =>
                index === data.length - 1 ? (
                  <circle key={`dot-${index}`} cx={cx} cy={cy} r={6} fill="#2196F3" />
                ) : (
                  <circle key={`dot-${index}`} cx={cx} cy={cy} r={4} fill="#E5E7EB" />
                )
              }
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* BOTTOM MONTH DOTS */}
      <div className="flex justify-between mt-4 px-2">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={item.label + index}
              className={`w-2 h-2 rounded-full ${
                index === data.length - 1 ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))
        ) : (
          <div className="text-sm text-gray-400 text-center w-full py-2">No timeline data available</div>
        )}
      </div>
    </div>
  );
}
