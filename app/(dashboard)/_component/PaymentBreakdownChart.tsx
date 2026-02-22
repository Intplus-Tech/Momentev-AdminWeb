"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { AnalyticsOverviewResponse } from "@/lib/actions/admin-analytics";

interface PaymentBreakdownProps {
  paymentModels?: AnalyticsOverviewResponse["byPaymentModel"];
  currency?: string;
}

const COLORS = ["#4196F0", "#6DD58C", "#FFB020", "#F04438"];

export default function PaymentBreakdownChart({ paymentModels = [], currency = "GBP" }: PaymentBreakdownProps) {
  const data = useMemo(() => {
    if (!paymentModels || paymentModels.length === 0) return [];

    return paymentModels.map((model) => {
      // Format the key to be human readable ("split_payout" -> "Split Payout")
      const formattedName = model._id
        ? model._id.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
        : "Unknown";
      
      return {
        name: formattedName,
        value: model.revenueMinor / 100,
        count: model.count,
      };
    });
  }, [paymentModels]);

  const formatMoney = (val: number) => {
    return val.toLocaleString("en-GB", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-700">Revenue by Model</h3>
      </div>

      <div className="flex-1 min-h-[250px]">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any) => formatMoney(Number(value) || 0)}
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-gray-400">
            No payment model data available.
          </div>
        )}
      </div>
    </div>
  );
}
