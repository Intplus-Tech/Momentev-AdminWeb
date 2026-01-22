"use client";

import { ChevronDown } from "lucide-react";

interface BookingRow {
  id: string;
  client: string;
  clientLocation: string;
  clientPhone: string;
  service: string;
  serviceDateTime: string;
  date: string;
  status: string;
  payment: string;
  amount: string;
  action: string;
}

interface BookingsTableProps {
  rows: BookingRow[];
}

export default function BookingsTable({ rows }: BookingsTableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="border-b text-gray-500">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Client</th>
            <th className="p-3 text-left">Service</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Payment</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{row.id}</td>

              {/* Client info */}
              <td className="p-3">
                <div>{row.client}</div>
                <div className="text-xs text-gray-400">{row.clientLocation}</div>
                <div className="text-xs text-gray-400">{row.clientPhone}</div>
              </td>

              {/* Service info */}
              <td className="p-3">
                <div>{row.service}</div>
                <div className="text-xs text-gray-400">{row.serviceDateTime}</div>
              </td>

              <td className="p-3">{row.date}</td>
              <td className="p-3">{row.status}</td>
              <td className="p-3">{row.payment}</td>
              <td className="p-3">{row.amount}</td>

              {/* Actions column */}
              <td className="p-3 flex items-center gap-4">
                {/* "View" text for all actions */}
                <span className="text-blue-600 cursor-pointer">{row.action !== "Quick Actions" ? `${row.action} View` : "View"}</span>

                {/* Chevron only for Quick Actions, aligned to right */}
                {row.action === "Quick Actions" && (
                  <ChevronDown size={16} className="text-blue-600 ml-auto cursor-pointer" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
