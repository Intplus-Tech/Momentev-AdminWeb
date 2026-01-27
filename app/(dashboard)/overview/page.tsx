import ActionRequiredCard from "../_component/ActionRequiredCard";
import OverviewCard from "../_component/OverviewCards";
import TrendsChart from "../_component/TrendChart";

export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="bg-white rounded-xl p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold">
          Plateform Overview
        </h1>
        <p className="text-muted-foreground text-sm">Today, October 26, 2024</p>
      </div>

      <OverviewCard />
      <TrendsChart />
      <div className="">
        <ActionRequiredCard />
      </div>
    </div>
  );
}
