import { AnalyticsOverviewResponse } from "@/lib/actions/admin-analytics";

interface TopVendorsProps {
  vendors?: AnalyticsOverviewResponse["topVendors"];
  currency?: string;
}

export default function TopVendorsList({ vendors = [], currency = "GBP" }: TopVendorsProps) {
  const formatMoney = (minor: number) => {
    return (minor / 100).toLocaleString("en-GB", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Top Earning Vendors</h3>
        <span className="text-sm text-gray-400">by volume</span>
      </div>

      <div className="space-y-4">
        {vendors.length > 0 ? (
          vendors.map((vendor, index) => (
            <div key={vendor.vendorId} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                  #{index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{vendor.businessName}</p>
                  <p className="text-xs text-gray-500">{vendor.bookingCount} bookings completed</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatMoney(vendor.revenueMinor)}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-sm text-gray-400">
            No vendor data available for this period.
          </div>
        )}
      </div>
    </div>
  );
}
