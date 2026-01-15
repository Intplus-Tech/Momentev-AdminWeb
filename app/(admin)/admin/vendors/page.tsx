"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileDown } from "lucide-react";
import ActivePagination from "./_components/ActivePagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { vendors } from "./mockdata";

const statusStyles: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Review: "bg-yellow-100 text-yellow-700",
  Flagged: "bg-orange-100 text-orange-700",
  Suspended: "bg-red-100 text-red-700",
  "Recently Approved": "bg-blue-100 text-blue-700",
};

/* ================= PAGE ================= */

export default function VendorPage() {
  const [filter, setFilter] = useState<
    "All" | "Review" | "Recently Approved" | "Flagged" | "Suspended"
  >("All");

  const filteredVendors =
    filter === "All"
      ? vendors
      : vendors.filter((vendor) => vendor.status === filter);

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="bg-white rounded-xl p-4 sm:p-6">
        <button className="text-xl sm:text-2xl font-semibold">
          Vendor Management
        </button>
        <p className="text-muted-foreground text-sm">
          {filteredVendors.length} Active Vendors
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
        <div className="w-full sm:flex-1 overflow-x-auto">
          <div className="flex items-center gap-6 sm:gap-10 text-[13px] bg-[#D9D9D9] p-2 rounded-lg min-w-max">
            <div className="p-1">
              <span
                onClick={() => setFilter("All")}
                className="font-medium text-[#2B4EFF] bg-white p-1 px-2 rounded-lg cursor-pointer"
              >
                All <span className="pl-3">(145)</span>
              </span>
            </div>

            <span
              onClick={() => setFilter("Review")}
              className="text-[#718096] cursor-pointer"
            >
              Pending Review 12
            </span>
            <span
              onClick={() => setFilter("Recently Approved")}
              className="text-[#718096] cursor-pointer"
            >
              Recently Approved 3
            </span>
            <span
              onClick={() => setFilter("Flagged")}
              className="text-[#718096] cursor-pointer"
            >
              Flagged 3
            </span>
            <span
              onClick={() => setFilter("Suspended")}
              className="text-[#718096] cursor-pointer"
            >
              Suspended 3
            </span>
          </div>
        </div>

        <button className="px-4 py-2 rounded-lg bg-[#D9D9D9] text-[#718096] text-sm flex items-center gap-2">
          <FileDown className="text-[#A0AEC0]" />
          Download
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-sm">
            <thead className="border-b">
              <tr className="text-left">
                <th className="p-4">ID</th>
                <th>Business Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Rating</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {filteredVendors.map((vendor) => (
                <tr
                  key={vendor.id}
                  // onClick={() =>
                  //   router.push(`/admin/vendorprofile/${vendor.id}`)
                  // }
                  // className="cursor-pointer"
                >
                  <td className="p-4">{vendor.id}</td>
                  <td className="font-medium">{vendor.name}</td>
                  <td>{vendor.category}</td>
                  <td>
                    <span
                      className={`px-5 py-2 rounded-lg text-xs ${
                        statusStyles[vendor.status]
                      }`}
                    >
                      {vendor.status}
                    </span>
                  </td>
                  <td>{vendor.rating}</td>
                  <td
                    className="text-[#2B4EFF] space-x-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button variant={"link"}>Edit</Button>
                    <Button variant={"link"}>
                      <Link href={`/admin/vendors/${vendor.id}`}>View</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ActivePagination />
    </div>
  );
}
