"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const STATUSES = ["Active", "Review", "Suspended", "Flagged", "Deactivated"];

export default function AccountStatus() {
  const [selectedStatus, setSelectedStatus] = useState<string>("Active");

  return (
    <div className="pb-10">
      <h2 className="text-[20px] text-[#191919] font-semibold mb-2">Status</h2>

      <div className="py-2">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <span className="font-medium whitespace-nowrap">Account Status:</span>

          {STATUSES.map((status) => {
            const isActive = selectedStatus === status;

            return (
              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className="flex items-center gap-2 whitespace-nowrap focus:outline-none"
              >
                <span
                  className={`flex items-center justify-center w-4 h-4 rounded border transition
                    ${
                      isActive
                        ? "bg-blue-700 border-blue-700"
                        : "border-gray-400"
                    }`}
                >
                  {isActive && <Check className="w-3 h-3 text-white" />}
                </span>

                <span>{status}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
