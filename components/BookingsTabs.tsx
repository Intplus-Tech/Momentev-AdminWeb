"use client";

import { useState } from "react";
import FilterDropdown from "./FilterDropdown";
import BookingsTable from "./BookingsTable";

const filtersConfig = [
  {
    key: "date",
    label: "Date Range",
    options: ["Today", "This Week", "This Month"],
  },
  {
    key: "status",
    label: "Status",
    options: ["In Progress", "Completed", "Upcoming"],
  },
  {
    key: "payment",
    label: "Payment Status",
    options: ["Paid", "Pending", "Escrow"],
  },
  {
    key: "amount",
    label: "Amount Range",
    options: ["< £500", "£500 - £2000", "> £2000"],
  },
  {
    key: "service",
    label: "Service Category",
    options: ["Wedding", "Corporate", "Engagement"],
  },
  { key: "client", label: "Client Type", options: ["Individual", "Business"] },
];

export default function BookingsTab() {
  const [filters, setFilters] = useState<Record<string, string[]>>({});

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

  return (
    <div className="space-y-6">
      {/* FILTER BAR */}
      <div className="bg-white rounded-lg p-4 flex flex-wrap gap-3 items-center">
        {filtersConfig.map((filter) => (
          <FilterDropdown
            key={filter.key}
            label={filter.label}
            options={filter.options}
            selected={filters[filter.key] || []}
            onChange={(value) => toggleFilter(filter.key, value)}
          />
        ))}

        <button className="px-4 py-2 border rounded-lg text-sm bg-white">
          Apply
        </button>

        <button
          onClick={() => setFilters({})}
          className="text-sm text-gray-500 ml-auto"
        >
          Clear filters
        </button>
      </div>

      {/* BOOKINGS TABLE */}
      <BookingsTable />
    </div>
  );
}
