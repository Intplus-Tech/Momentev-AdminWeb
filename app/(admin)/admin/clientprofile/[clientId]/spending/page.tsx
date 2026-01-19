"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ClientSpendingPage() {
  const router = useRouter();
  const { clientId } = useParams();

  return (
    <section className="min-h-screen bg-[#F4F5F8] px-4 md:px-8 py-6 space-y-6">
      {/* HEADER */}
      <div className="space-y-3">
        <div className="flex items-center justify-center relative">
          <button
            onClick={() => router.back()}
            className="absolute left-0 flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <h1 className="text-xl md:text-2xl font-semibold text-center">
            CLIENT PROFILE MANAGEMENT
          </h1>
        </div>

        <p className="text-center text-sm text-gray-500">{clientId}</p>

        {/* TABS */}
        <div className="flex justify-center gap-6 border-b text-sm font-medium pt-4">
          <span
            onClick={() =>
              router.push(`/admin/clientprofile/${clientId}`)
            }
            className="cursor-pointer text-gray-500"
          >
            Overview
          </span>
          <span
            onClick={() =>
              router.push(`/admin/clientprofile/${clientId}/bookings`)
            }
            className="cursor-pointer text-gray-500"
          >
            Bookings
          </span>
          <span className="pb-2 border-b-2 border-red-500 text-black">
            Spending
          </span>
          <span
            onClick={() =>
              router.push(`/admin/clientprofile/${clientId}/reviews`)
            }
            className="cursor-pointer text-gray-500"
          >
            Reviews
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="bg-white rounded-xl p-4 md:p-6 space-y-6">
        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CARD 1 — Spending Summary */}
          <div className="border rounded-xl p-5 space-y-4">
            <h3 className="font-semibold">Spending Summary</h3>

            <Stat label="Total Lifetime Value" value="£4,830" />
            <Stat label="Avg. Monthly Spend" value="£268" />
            <Stat label="Projected 12-month Value" value="£3,216" />
            <Stat label="Platform Commission Earned" value="£483" />
            <Stat label="Avg. Transaction" value="£1,610" />
          </div>

          {/* CARD 2 — Payment & Performance */}
          <div className="border rounded-xl p-5 space-y-4">
            <h3 className="font-semibold">Payment Methods</h3>

            <div className="space-y-2">
              <p className="font-medium">Visa ****1234 (Primary)</p>
              <p className="text-sm text-gray-500">Description</p>

              <p className="font-medium pt-2">Mastercard ****5678 (Backup)</p>
              <p className="text-sm text-gray-500">Description</p>
            </div>

            <div className="pt-4 space-y-2">
              <Stat label="Success Rate" value="98%" />
              <Stat label="Failed Payments" value="2" />
            </div>
          </div>
        </div>

        {/* CARD 3 — Duplicate / Extended Payment Insight */}
        <div className="border rounded-xl p-5 space-y-4 max-w-full lg:max-w-[48%]">
          <h3 className="font-semibold">Payment Methods</h3>

          <p className="font-medium">Visa ****1234 (Primary)</p>
          <p className="font-medium">Mastercard ****5678 (Backup)</p>

          <div className="pt-4 space-y-2">
            <Stat label="Success Rate" value="98%" />
            <Stat label="Failed Payments" value="2" />
            <Stat label="Avg. Transaction" value="£1,610" />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
          <button className="px-4 py-2 rounded-lg bg-gray-200 text-sm font-medium">
            Apply Selected Actions
          </button>

          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium">
            Save Settings
          </button>
        </div>
      </div>
    </section>
  );
}

/* ================= HELPERS ================= */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
