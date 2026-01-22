"use client";

import { useState } from "react";
import FilterDropdown from "./FilterDropdown";
import BookingsTable from "./BookingsTable";

interface BookingsTabProps {
  vendorId: string;
}

interface BookingRow {
  id: string;
  client: string;
  clientLocation: string;
  clientPhone: string;
  service: string;
  serviceDateTime:string;
  date: string;
  status: string;
  payment: string;
  amount: string;
  action: string;
}

const filtersConfig = [
  { key: "date", label: "Date Range", options: ["Today", "This Week", "This Month"] },
  { key: "status", label: "Status", options: ["In Progress", "Completed", "Upcoming"] },
  { key: "payment", label: "Payment Status", options: ["Paid", "Pending", "Escrow"] },
  { key: "amount", label: "Amount Range", options: ["< £500", "£500 - £2000", "> £2000"] },
  { key: "service", label: "Service Category", options: ["Wedding", "Corporate", "Engagement"] },
  { key: "client", label: "Client Type", options: ["Individual", "Business"] },
];

const allRows: BookingRow[] = [
  {
    id: "B-9013",
    client: "Sarah Johnson",
    clientLocation: "London, UK",
    clientPhone: "+44 7700 900123",
    service: "Wedding Photography",
    serviceDateTime: "Oct 28, 2024, 10:00 AM",
    date: "Oct 28, 2024",
    status: "Held (Dispute Active)",
    payment: "Escrow",
    amount: "£2,500",
    action: "Quick Actions",
  },
  {
    id: "B-9011",
    client: "James Wilson",
    clientLocation: "Manchester, UK",
    clientPhone: "+44 7800 123456",
    service: "Wedding Photography",
    serviceDateTime: "Oct 28, 2024, 2:00 PM",
    date: "Oct 28, 2024",
    status: "Confirmed",
    payment: "Paid",
    amount: "£2,500",
    action: "Analytics",
  },
  {
    id: "B-9010",
    client: "Maria Garcia",
    clientLocation: "Birmingham, UK",
    clientPhone: "+44 7900 654321",
    service: "Wedding Photography",
    serviceDateTime: "Oct 28, 2024, 12:00 PM",
    date: "Oct 28, 2024",
    status: "Completed",
    payment: "Paid",
    amount: "£650",
    action: "View",
  },
  {
    id: "B-9009",
    client: "David Smith",
    clientLocation: "Liverpool, UK",
    clientPhone: "+44 7701 234567",
    service: "Corporate Photography",
    serviceDateTime: "Nov 1, 2024, 9:00 AM",
    date: "Nov 1, 2024",
    status: "In Progress",
    payment: "Pending",
    amount: "£1,200",
    action: "View",
  },
];


export default function BookingsTab({ vendorId }: BookingsTabProps) {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [filteredRows, setFilteredRows] = useState(allRows);

  // toggle individual option
  const toggleFilter = (key: string, value: string) => {
    setFilters((prev) => {
      const values = prev[key] || [];
      return {
        ...prev,
        [key]: values.includes(value)
          ? values.filter((v) => v !== value)
          : [...values, value],
      };
    });
  };

  // apply filtering logic
  const applyFilters = () => {
    let rows = allRows;

    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        rows = rows.filter((row) => {
          const rowValue = row[key as keyof BookingRow];
          return values.some((v) => rowValue.includes(v));
        });
      }
    });

    setFilteredRows(rows);
  };

  // clear everything
  const clearFilters = () => {
    setFilters({});
    setFilteredRows(allRows);
    setOpenDropdown(null);
  };

  return (
    <div className="space-y-6">
      <p className="text-xs text-gray-400">Vendor ID: {vendorId}</p>

      {/* FILTER BAR */}
      <div className="bg-white rounded-lg p-4 flex flex-wrap gap-3 items-center">
        {filtersConfig.map((filter) => (
          <FilterDropdown
            key={filter.key}
            label={filter.label}
            options={filter.options}
            selected={filters[filter.key] || []}
            onChange={(value) => toggleFilter(filter.key, value)}
            open={openDropdown === filter.label}
            setOpenDropdown={setOpenDropdown}
            hasSelection={(filters[filter.key]?.length || 0) > 0} // button blue if selected
          />
        ))}

        <button
          onClick={applyFilters}
          className="px-4 py-2 border rounded-lg text-sm bg-white"
        >
          Apply
        </button>

        <button
          onClick={clearFilters}
          className="text-sm text-gray-500 ml-auto"
        >
          Clear filters
        </button>
      </div>

      {/* SELECTED FILTERS DISPLAY */}
      {Object.entries(filters)
        .filter(([_, values]) => values.length > 0)
        .map(([key, values]) => (
          <div key={key} className="flex flex-wrap gap-2">
            {values.map((value) => (
              <span
                key={value}
                className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
              >
                {value}
              </span>
            ))}
          </div>
        ))}

      {/* BOOKINGS TABLE */}
      <BookingsTable rows={filteredRows} />
    </div>
  );
}
