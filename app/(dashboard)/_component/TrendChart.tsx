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

const data = [
  { month: "Jan", value: 10000 },
  { month: "Feb", value: 17000 },
  { month: "Mar", value: 18000 },
  { month: "Apr", value: 17500 },
  { month: "May", value: 25000 },
  { month: "Jun", value: 38753 },
  { month: "Jul", value: 30000 },
  { month: "Aug", value: 20000 },
  { month: "Sept", value: 18500 },
  { month: "Oct", value: 22000 },
  { month: "Nov", value: 24500 },
  { month: "Dec", value: 23500 },
];

export default function TrendsChart() {
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
              dataKey="month"
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
                      £ {payload[0].value?.toLocaleString()}
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
              dot={({ cx, cy, payload }) =>
                payload.month === "Jun" ? (
                  <circle cx={cx} cy={cy} r={6} fill="#2196F3" />
                ) : (
                  <circle cx={cx} cy={cy} r={4} fill="#E5E7EB" />
                )
              }
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* BOTTOM MONTH DOTS */}
      <div className="flex justify-between mt-4 px-2">
        {data.map((item) => (
          <div
            key={item.month}
            className={`w-2 h-2 rounded-full ${
              item.month === "Jun" ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
