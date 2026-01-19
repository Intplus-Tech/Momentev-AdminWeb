"use client";

import MetricCards from "./_components/MetricCards";
import RevenueAnalytics from "./_components/RevenueAnalytics";
import PaymentModel from "./_components/PaymentModel";
import RevenueByRegion from "./_components/RevenueByRegion";
import TopVendors from "./_components/TopVendors";
import TodaysPayments from "./_components/TodaysPayments";
import PaymentMethods from "./_components/PaymentMethods";
import PaymentQueue from "./_components/PaymentQueue";

export default function FinancePage() {
  return (
    <section className="w-full px-4 md:px-8 py-6 space-y-8 bg-[#F4F5F8]">
      <h1 className="text-xl font-semibold">Performance metrics</h1>

      <MetricCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueAnalytics />
        <PaymentModel />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueByRegion />
        <TopVendors />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodaysPayments />
        <PaymentMethods />
      </div>

      <PaymentQueue />
    </section>
  );
}
