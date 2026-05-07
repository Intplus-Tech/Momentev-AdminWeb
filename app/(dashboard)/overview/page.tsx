import OverviewCard from "../_component/OverviewCards";
import TrendsChart from "../_component/TrendChart";
import TopVendorsList from "../_component/TopVendorsList";
import PaymentBreakdownChart from "../_component/PaymentBreakdownChart";
import { getAnalyticsOverview, getBookingTrends } from "@/lib/actions/admin-analytics";

export default async function AdminOverviewPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const period = (searchParams?.period as string) || "day";
  const currency = (searchParams?.currency as string) || undefined;
  const from = (searchParams?.from as string) || undefined;
  const to = (searchParams?.to as string) || undefined;

  const [overviewResult, trendsResult] = await Promise.all([
    getAnalyticsOverview({ from, to, currency }),
    getBookingTrends({ from, to, period, currency })
  ]);
  
  const analytics = overviewResult.success ? overviewResult.data : null;
  const bookingTrends = trendsResult.success && trendsResult.data ? trendsResult.data.series : [];

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
          <TrendsChart chartData={bookingTrends} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TopVendorsList vendors={analytics.topVendors} currency={analytics.currency} />
            <PaymentBreakdownChart paymentModels={analytics.byPaymentModel} currency={analytics.currency} />
          </div>
        </>
      ) : (
        <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-red-100">
          <p className="font-semibold text-red-500 mb-2">Failed to load analytics data.</p>
          <p className="text-sm">{overviewResult.error || "An error occurred."}</p>
        </div>
      )}
    </div>
  );
}
