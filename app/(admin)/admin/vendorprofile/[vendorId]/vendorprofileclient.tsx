"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, X } from "lucide-react";

import { BookingTable } from "../BookingTable";
import AccountStatus from "../AccountStatus";
import BookingsTab from "./BookingsTabs";



/* ================= TYPES ================= */

type Tab = "Overview" | "Bookings" | "Earnings" | "Reviews";

interface VendorProfileClientProps {
  vendorId: string;
}

/* ================= PAGE DATA ================= */

const documents = [
  {
    id: "reg-cert",
    name: "Reg_certificate.pdf",
    type: "pdf",
  },
  {
    id: "business-license",
    name: "Business_License.pdf",
    type: "pdf",
  },
];

const portfolio = [
  {
    id: "logo",
    name: "Business Logo",
    type: "image",
  },
  {
    id: "profile-img",
    name: "Profile_img098172",
    type: "image",
  },
  {
    id: "img-09102",
    name: "img_09102.jpg",
    type: "image",
  },
  {
    id: "img-09103",
    name: "img_09103.jpg",
    type: "image",
  },
  {
    id: "img-09104",
    name: "img_09104.jpg",
    type: "image",
  },
];

/* ================= COMPONENT ================= */

export default function VendorProfileClient({
  vendorId,
}: VendorProfileClientProps) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [suspended, setSuspended] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-4 sm:px-6 lg:px-10 py-14 space-y-16">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="text-[10px] text-gray-500 hover:text-gray-700"
        >
          ← BACK
        </button>

        <div className="text-center flex-1">
          <h1 className="text-[27px] sm:text-2xl font-semibold">
            VENDOR PROFILE MANAGEMENT
          </h1>
          <p className="text-xs text-gray-400">{vendorId}</p>
        </div>

        <span className="text-green-600 text-sm flex items-center gap-1">
          ✔ Verified
        </span>
      </div>

      {/* ================= TABS ================= */}
      <div className="border-b flex gap-20 text-[20px]">
        {["Overview", "Bookings", "Earnings", "Reviews"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as Tab)}
            className={`pb-3 ${
              activeTab === tab
                ? "border-b-2 border-red-500 font-medium"
                : "text-[#191919] hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ================= OVERVIEW ================= */}
      {activeTab === "Overview" && (
        <div className="space-y-10">
          {/* QUICK ACTIONS */}
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="space-y-2 text-sm">
              <p className="font-medium text-[#191919] text-[20px]">
                Quick Actions:
              </p>
              <ul className="list-disc pl-4 text-[#1E1E1E] space-y-1">
                <li>Adjust Commission Rate (Current: 10%)</li>
                <li>Send Warning Notification</li>
              </ul>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm">Temporarily Suspend Account</span>
              <button
                onClick={() => setSuspended(!suspended)}
                className={`w-12 h-6 rounded-full relative transition ${
                  suspended ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                    suspended ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* METRICS */}
          <h1 className="text-[20px] text-[#191919] font-semibold mb-4">
            Performance Metrics
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              ["Total Bookings", "47", "£89,200 revenue"],
              ["Response Rate", "92%", "Avg: 2.4 hours"],
              ["Rating", "4.9 ★", "Reviews: 247"],
              ["Disputes", "2", "0.4% bookings"],
              ["Repeat Clients", "31%", ""],
            ].map(([title, value, sub]) => (
              <div
                key={title}
                className="bg-white rounded-xl p-4 border space-y-4 last:col-span-2 lg:col-span-1"
              >
                <p className="text-[14px] font-semibold text-[#000000]">
                  {title}
                </p>
                <p className="text-[22px] font-semibold text-[#000000]">
                  {value}
                </p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            ))}
          </div>

          {/* BUSINESS DETAILS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5text-[#1E1E1E]">
            <div className="space-y-3">
              <h3 className="font-medium">Business Details</h3>

              <p className="flex space-x-2">
                <span className="min-w-[140px]">Owner:</span>
                <span>Michael Chen • Joined: Mar 15, 2025</span>
              </p>

              <p className="flex space-x-2">
                <span className="min-w-[140px]">Business Type:</span>
                <span>Sole Proprietorship • 3 years experience</span>
              </p>

              <p className="flex space-x-2">
                <span className="min-w-[140px]">Service Area:</span>
                <span>London + 50-mile radius</span>
              </p>

              <p className="flex space-x-2">
                <span className="min-w-[140px]">Registration:</span>
                <span>✔ Public Liability</span>
              </p>

              <p className="flex space-x-2">
                <span className="min-w-[140px]"></span>
                <span>✔ Professional Indemnity</span>
              </p>

              <p className="flex space-x-2">
                <span className="min-w-[140px]">Payment Model:</span>
                <span>Split Payout (50% deposit)</span>
              </p>

              <p className="flex space-x-2">
                <span className="min-w-[140px]">Stripe:</span>
                <span>✔ Connected • Last payout Oct 22, 2025</span>
              </p>
            </div>
          </div>

          {/* SERVICES & CONTACT */}
          <div className="flex flex-col lg:flex-row gap-10 py-8">
            <div className="space-y-3">
              <h2 className="font-semibold text-[20px] text-[#191919]">
                Services Categories
              </h2>
              <ul className="list-disc space-y-5 text-[16px] text-[#191919]">
                <li>Wedding Photography</li>
                <li>Engagement Sessions</li>
                <li>Corporate Events</li>
                <li>Portrait Photography</li>
                <li>Event Videography</li>
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="font-semibold text-[20px] text-[#191919]">
                Contact Information
              </h3>
              <p>Email: michael@elegant.com</p>
              <p>Phone: +44 7911 123456</p>
              <p>Mobile: +44 7911 654321</p>
              <p>Address: 123 Photography Ln</p>
              <p>City: London, UK</p>
              <p>Website: elegantweddings.com</p>
            </div>
          </div>

          {/* DOCUMENTS & PORTFOLIO */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-sm">
            <section>
              <h3 className="font-medium mb-3 text-[20px]">Documents</h3>
              <ul className="space-y-2">
                {documents.map((doc) => (
                  <li key={doc.id} className="flex items-center gap-2">
                    <span>📄</span>
                    <span className="text-[#1E1E1E] text-[20px]">
                      {doc.name}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="font-medium mb-3 text-[20px]">Portfolio</h3>
              <ul className="space-y-2">
                {portfolio.map((item) => (
                  <li key={item.id} className="flex items-center gap-2">
                    <span>🖼</span>
                    <span className="text-[#1E1E1E] text-[20px]">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* BOOKINGS */}
          <BookingTable />

          {/* RECENT ACTIVITY */}
          <div className="space-y-2">
            <h2 className="text-[20px] text-[#191919] font-semibold">
              Recent Activity
            </h2>
            <div className="space-y-3 text-[#1E1E1E] text-[18px]">
              <p>Oct 26: Completed booking #B-8912 (£1,830)</p>
              <p>Oct 25: New booking received (#B-9012)</p>
              <p>Oct 24: Client review posted (5 stars)</p>
              <p>Oct 23: Updated service pricing</p>
              <p>Oct 22: Payout processed (£892)</p>
            </div>
          </div>

          {/* BULK ACTIONS */}
          <div className="space-y-3">
            <h2>BULK ACTIONS & SETTINGS</h2>

            <div className="flex gap-4 items-center">
              <Check className="text-white border bg-blue-700 rounded" />
              <span>Apply special promotion</span>
              <p className="border bg-[#F5F5F5] flex gap-3 p-2 rounded">
                10% <ChevronDown />
              </p>
              <span className="flex gap-4">
                <X className="text-green-600" />
                <Check className="text-red-700" />
              </span>
            </div>

            <div className="flex gap-4 items-center">
              <Check className="text-white border bg-blue-700 rounded" />
              <span>Feature in category. Top Rated Photographers</span>
            </div>
          </div>

          <AccountStatus />

          {/* ACTIONS */}
          <div className="flex justify-center gap-4 pt-6">
            <button className="px-6 py-3 rounded-lg bg-blue-600 text-white text-sm">
              Apply Selected Actions
            </button>
            <button className="px-6 py-3 rounded-lg border text-blue-600 text-sm">
              Save Settings
            </button>
          </div>
        </div>
      )}

      {activeTab === "Bookings" && <BookingsTab vendorId={vendorId} />}

    </div>
  );
}
