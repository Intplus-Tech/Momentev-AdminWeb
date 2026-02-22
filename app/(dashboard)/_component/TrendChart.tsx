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

import { useMemo } from "react";

interface TrendsChartProps {
  chartData?: Array<{
    date: string;
    revenueMinor: number;
    commissionMinor: number;
    paymentCount: number;
  }>;
}

export default function TrendsChart({ chartData = [] }: TrendsChartProps) {
  const data = useMemo(() => {
    if (!chartData || chartData.length === 0) return [];
    
    return chartData.map(item => {
      // Parse the ISO date string backwards for a simple formatted day or month
      const d = new Date(item.date);
      const label = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      return {
        label,
        value: item.revenueMinor / 100, // Convert to major units
        fullDate: item.date
      };
    }).reverse(); // The API might return newest first, we usually want oldest left to newest right for line charts
  }, [chartData]);

  return (
    <div className="bg-white rounded-2xl p-6 w-full">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Booking Trends</h3>

        <select className="border rounded-lg px-4 py-2 text-sm text-gray-500 outline-none">
          <option>Month</option>
        </select>
      </div>

      {/* CHART */}
      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
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
              tickFormatter={(v) => `£${v / 1000}k`}
              tick={{ fill: "#9AA0A6", fontSize: 12 }}
            />

            {/* TOOLTIP */}
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload?.length) {
                  return (
                    <div className="bg-blue-500 text-white text-xs px-3 py-1 rounded-lg">
                      £ {payload[0].value?.toLocaleString()} ({payload[0].payload.label})
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
              dataKey="value"
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
