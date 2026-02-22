import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { AnalyticsOverviewResponse } from "@/lib/actions/admin-analytics";

interface OverviewCardsProps {
  performance?: AnalyticsOverviewResponse["performance"];
  todaysPayments?: AnalyticsOverviewResponse["todaysPayments"];
  currency?: string;
}

export default function OverviewCard({ performance, todaysPayments, currency = "GBP" }: OverviewCardsProps) {
  const formatMoney = (minor: number) => {
    return (minor / 100).toLocaleString("en-GB", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    });
  };

  const cards = [
    {
      title: "Total Revenue",
      value: performance ? formatMoney(performance.totalRevenueMinor) : "£0",
      trend: "All-time",
      trendUp: true,
      trendNeutral: true,
    },
    {
      title: "Today's Volume",
      value: todaysPayments ? formatMoney(todaysPayments.successful.amountMinor) : "£0",
      trend: todaysPayments ? `${todaysPayments.successful.count} payments` : "0 payments",
      trendUp: true,
      trendNeutral: true,
    },
    {
      title: "Pending Payouts",
      value: performance ? formatMoney(performance.pendingPayoutMinor) : "£0",
      trend: "Processing",
      trendUp: false,
      trendNeutral: true,
    },
    {
      title: "Active Escrow",
      value: performance ? formatMoney(performance.activeEscrowMinor) : "£0",
      trend: "Secured",
      trendUp: true,
      trendNeutral: true,
    },
    {
      title: "Disputed Funds",
      value: performance ? formatMoney(performance.disputedFundsMinor) : "£0",
      trend: performance ? `${performance.disputedCases} cases` : "0 cases",
      trendUp: false,
      trendNeutral: false,
    },
  ];

  return (
    <div
      className="
       grid grid-cols-2 lg:grid-cols-5 gap-4"
    >
      {cards.map((card, i) => (
        <div
          key={i}
          className="
            bg-white rounded-xl
           last:col-span-2 lg:last:col-span-1
            p-3 sm:p-4
            space-y-3
          "
        >
          <div className="space-y-1">
            <h2 className="text-[12px] sm:text-[14px] font-black">
              {card.title}
            </h2>
            <p className="text-[18px] sm:text-[22px] font-semibold">{card.value}</p>
          </div>

          <p className="flex items-center gap-1 text-[7px] sm:text-[8px]">
            <span className={card.trendNeutral ? "text-gray-400" : (card.trendUp ? "text-[#6DD58C]" : "text-red-500")}>
              {card.trendNeutral ? <Minus size={12} /> : (card.trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />)}
            </span>
            <span className="font-bold">{card.trend}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
