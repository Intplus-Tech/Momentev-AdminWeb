"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

/* ================= TYPES ================= */

interface EarningTabProps {
  vendorId: string;
}

interface EarningItem {
  date: string;
  bookingId: string;
  client: string;
  service: string;
  gross: string;
  commission: string;
  payout: string;
  status: "Held" | "Paid";
  action: string[];
}

type Filters = {
  status?: "Held" | "Paid";
  paymentStatus?: "Held" | "Paid";
  service?: string;
  amountRange?: "Below £2,000" | "£2,000 - £3,000" | "Above £3,000";
  dateRange?: "Last 7 Days" | "Last 30 Days";
  clientType?: "Individual" | "Corporate";
};

/* ================= DATA ================= */

const earnings: EarningItem[] = [
  {
    date: "Oct 28",
    bookingId: "B-9013",
    client: "Sarah Johnson",
    service: "Wedding",
    gross: "£1,830",
    commission: "£183",
    payout: "£1,647",
    status: "Held",
    action: ["View", "Release"],
  },
  {
    date: "Oct 28",
    bookingId: "B-9012",
    client: "James Wilson",
    service: "Corporate Event",
    gross: "£2,500",
    commission: "£250",
    payout: "£2,250",
    status: "Paid",
    action: ["View", "Receipt"],
  },
  {
    date: "Oct 27",
    bookingId: "B-9011",
    client: "Maria Garcia",
    service: "Engagement",
    gross: "£1,830",
    commission: "£183",
    payout: "£1,647",
    status: "Paid",
    action: ["View", "Receipt"],
  },
];

/* ================= FILTER DROPDOWN ================= */

function FilterDropdown({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value?: string;
  onChange: (value?: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 bg-white border px-4 py-2 rounded-md text-sm"
      >
        {value ?? label}
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full bg-white border rounded-md shadow">
          <button
            onClick={() => {
              onChange(undefined);
              setOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            All
          </button>

          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ================= COMPONENT ================= */

export default function EarningTab({ vendorId }: EarningTabProps) {
  const [filters, setFilters] = useState<Filters>({});

  console.debug("Earnings loaded for vendor:", vendorId);

  const filteredEarnings = useMemo(() => {
    return earnings.filter((item) => {
      const payout = Number(item.payout.replace(/[£,]/g, ""));

      if (filters.status && item.status !== filters.status) return false;
      if (filters.paymentStatus && item.status !== filters.paymentStatus)
        return false;

      if (filters.service && item.service !== filters.service) return false;

      if (filters.amountRange) {
        if (filters.amountRange === "Below £2,000" && payout >= 2000)
          return false;
        if (
          filters.amountRange === "£2,000 - £3,000" &&
          (payout < 2000 || payout > 3000)
        )
          return false;
        if (filters.amountRange === "Above £3,000" && payout <= 3000)
          return false;
      }

      if (filters.clientType) {
        const isCorporate = item.service === "Corporate Event";
        if (filters.clientType === "Corporate" && !isCorporate) return false;
        if (filters.clientType === "Individual" && isCorporate) return false;
      }

      // Date range placeholder (static demo-safe)
      if (filters.dateRange === "Last 7 Days") return true;
      if (filters.dateRange === "Last 30 Days") return true;

      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-8">
      {/* ================= FILTERS ================= */}
      <div className="flex flex-wrap gap-3">
        <FilterDropdown
          label="Date Range"
          options={["Last 7 Days", "Last 30 Days"]}
          value={filters.dateRange}
          onChange={(v) =>
            setFilters((f) => ({ ...f, dateRange: v as Filters["dateRange"] }))
          }
        />

        <FilterDropdown
          label="Status"
          options={["Paid", "Held"]}
          value={filters.status}
          onChange={(v) =>
            setFilters((f) => ({ ...f, status: v as Filters["status"] }))
          }
        />

        <FilterDropdown
          label="Payment Status"
          options={["Paid", "Held"]}
          value={filters.paymentStatus}
          onChange={(v) =>
            setFilters((f) => ({
              ...f,
              paymentStatus: v as Filters["paymentStatus"],
            }))
          }
        />

        <FilterDropdown
          label="Amount Range"
          options={[
            "Below £2,000",
            "£2,000 - £3,000",
            "Above £3,000",
          ]}
          value={filters.amountRange}
          onChange={(v) =>
            setFilters((f) => ({
              ...f,
              amountRange: v as Filters["amountRange"],
            }))
          }
        />

        <FilterDropdown
          label="Service Category"
          options={[...new Set(earnings.map((e) => e.service))]}
          value={filters.service}
          onChange={(v) =>
            setFilters((f) => ({ ...f, service: v }))
          }
        />

        <FilterDropdown
          label="Client Type"
          options={["Individual", "Corporate"]}
          value={filters.clientType}
          onChange={(v) =>
            setFilters((f) => ({
              ...f,
              clientType: v as Filters["clientType"],
            }))
          }
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-xl overflow-x-auto">
        <table className="min-w-[1100px] w-full text-sm">
          <thead className="border-b">
            <tr className="text-left text-gray-600">
              <th className="p-4">Date</th>
              <th className="p-4">Booking ID</th>
              <th className="p-4">Client</th>
              <th className="p-4">Service</th>
              <th className="p-4">Gross Amount</th>
              <th className="p-4">Commission</th>
              <th className="p-4">Net Payout</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEarnings.map((item) => (
              <tr key={item.bookingId} className="border-b last:border-0">
                <td className="p-4">{item.date}</td>
                <td className="p-4">{item.bookingId}</td>
                <td className="p-4">{item.client}</td>
                <td className="p-4">{item.service}</td>
                <td className="p-4">{item.gross}</td>
                <td className="p-4">{item.commission}</td>
                <td className="p-4">{item.payout}</td>

                <td className="p-4">
                  {item.status === "Held" ? (
                    <span className="flex items-center gap-2 text-red-600">
                      <span className="w-3 h-3 bg-red-600 rounded-full" />
                      Held
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-green-600">
                      <span className="w-4 h-4 bg-green-600 text-white text-xs flex items-center justify-center rounded-sm">
                        ✓
                      </span>
                      Paid
                    </span>
                  )}
                </td>

                <td className="p-4 space-x-4 text-blue-600">
                  {item.action.map((act) => (
                    <button key={act} className="underline">
                      {act}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
