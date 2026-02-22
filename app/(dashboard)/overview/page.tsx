import ActionRequiredCard from "../_component/ActionRequiredCard";
import OverviewCard from "../_component/OverviewCards";
import TrendsChart from "../_component/TrendChart";
import TopVendorsList from "../_component/TopVendorsList";
import PaymentBreakdownChart from "../_component/PaymentBreakdownChart";
import { getAnalyticsOverview } from "@/lib/actions/admin-analytics";

export default async function AdminOverviewPage() {
  const result = await getAnalyticsOverview();
  const analytics = result.success ? result.data : null;

  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="bg-white rounded-xl p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold">
          Platform Overview
        </h1>
        <p className="text-muted-foreground text-sm">Today, {todayStr}</p>
      </div>

      {analytics ? (
        <>
          <OverviewCard
            performance={analytics.performance}
            todaysPayments={analytics.todaysPayments}
            currency={analytics.currency}
          />
          <TrendsChart chartData={analytics.revenueAnalytics} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopVendorsList vendors={analytics.topVendors} currency={analytics.currency} />
            <PaymentBreakdownChart paymentModels={analytics.byPaymentModel} currency={analytics.currency} />
          </div>
        </>
      ) : (
        <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-red-100">
          <p className="font-semibold text-red-500 mb-2">Failed to load analytics data.</p>
          <p className="text-sm">{result.error}</p>
        </div>
      )}
      <div className="">
        <ActionRequiredCard />
      </div>
    </div>
  );
}
