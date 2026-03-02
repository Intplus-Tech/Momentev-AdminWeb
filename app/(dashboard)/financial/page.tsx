import { getAnalyticsOverview } from "@/lib/actions/admin-analytics";
import OverviewCard from "../_component/OverviewCards";
import RevenueReport from "./_components/RevenueReport";
import PendingPayoutsTable from "./_components/PendingPayoutsTable";

export default async function FinancePage() {
  const result = await getAnalyticsOverview();
  const analytics = result.success ? result.data : null;

  return (
    <section className="w-full px-4 md:px-8 py-6 space-y-8 bg-[#F4F5F8] min-h-[calc(100vh-72px)]">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Financial Pipeline</h1>
        <p className="text-sm text-gray-500">Monitor your platform totals, revenue, and payouts</p>
      </div>

      {/* Top Overview Cards from the Dashboard */}
      {analytics ? (
        <OverviewCard
          performance={analytics.performance}
          todaysPayments={analytics.todaysPayments}
          currency={analytics.currency}
        />
      ) : (
        <div className="p-4 text-center text-red-500 bg-red-50 rounded-xl">
          Failed to load dashboard overview values.
        </div>
      )}

      {/* New specific GET /revenue layout */}
      <RevenueReport />

      {/* New specific GET /payouts/pending layout */}
      <PendingPayoutsTable />
    </section>
  );
}