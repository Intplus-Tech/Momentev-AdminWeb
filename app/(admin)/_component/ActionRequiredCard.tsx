"use client";

import { MoreVertical } from "lucide-react";

export default function ActionRequiredCard() {
  return (
    <section
      className="
        grid grid-cols-1
        lg:grid-cols-2
        gap-6
        w-full
      "
    >
      {/* ACTION REQUIRED */}
      <div
        className="
          bg-white rounded-2xl
          p-4 sm:p-5
          w-full
          flex flex-col
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <p className="text-sm font-medium text-red-500">
              Action Required (2)
            </p>
          </div>

          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={18} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="space-y-3 flex-1">
          {/* HIGH PRIORITY */}
          <div className="bg-[#FFF3F3] rounded-xl p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-900">
                  High Priority
                </p>
                <p className="text-sm text-gray-600">Dispute #D-891 urgent</p>
                <p className="text-xs text-gray-500">3 refunding to process</p>
              </div>

              <p className="text-xs text-gray-400 whitespace-nowrap">
                12th Nov. 2025
              </p>
            </div>
          </div>

          {/* MEDIUM PRIORITY */}
          <div className="bg-[#F1F7FF] rounded-xl p-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-900">
                Medium Priority
              </p>
              <p className="text-sm text-gray-600">12 vendor reviews</p>
              <p className="text-xs text-gray-500">Category updates</p>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITIES */}
      <div
        className="
          bg-white rounded-2xl
          p-4 sm:p-5
          w-full
          flex flex-col
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-black">Recent Activities</p>

          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={18} />
          </button>
        </div>

        {/* ACTIVITIES LIST */}
        <div
          className="
            space-y-3
            overflow-y-auto
            h-full
            pr-1
          "
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#F9FCFF] rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-semibold text-gray-900">09:42</p>

                <p className="text-xs text-gray-400 whitespace-nowrap">
                  Vendor #872 approved
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
