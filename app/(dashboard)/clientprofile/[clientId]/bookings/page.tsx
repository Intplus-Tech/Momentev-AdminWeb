"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface Booking {
  id: string;
  vendor: string;
  service: string;
  date: string;
  amount: string;
  status: "Held" | "Completed";
}

export default function ClientBookingsPage() {
  const router = useRouter();
  const { clientId } = useParams();

  const bookings: Booking[] = [
    {
      id: "B-9013",
      vendor: "Elegant Weddings",
      service: "Wedding Photography",
      date: "Oct 28, 24",
      amount: "£2,500",
      status: "Held",
    },
    {
      id: "B-7824",
      vendor: "London Catering",
      service: "Wedding Catering",
      date: "Jun 15, 24",
      amount: "£2,500",
      status: "Completed",
    },
    {
      id: "B-6541",
      vendor: "Premier Venues",
      service: "Venue Booking",
      date: "Mar 8, 24",
      amount: "£650",
      status: "Completed",
    },
  ];

  return (
    <section className="w-full min-h-screen bg-[#F4F5F8] px-4 md:px-8 py-6 space-y-6">
      {/* HEADER */}
      <div className="space-y-2">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#1F2937] text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h1 className="text-xl md:text-2xl font-semibold text-[#1F2937]">
          CLIENT PROFILE MANAGEMENT
        </h1>

        <p className="text-sm text-[#6B7280]">{clientId}</p>

        {/* TABS */}
        <div className="flex gap-6 border-b text-sm font-medium mt-4">
          <span
            onClick={() => router.push(`/clientprofile/${clientId}`)}
            className="cursor-pointer text-gray-500"
          >
            Overview
          </span>
          <span className="pb-2 border-b-2 border-red-500 text-black">
            Bookings
          </span>
          <span
            onClick={() => router.push(`/clientprofile/${clientId}/spending`)}
            className="cursor-pointer text-gray-500"
          >
            Spending
          </span>
          <span
            onClick={() => router.push(`/clientprofile/${clientId}/reviews`)}
            className="cursor-pointer text-gray-500"
          >
            Reviews
          </span>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="border-b bg-white">
              <tr className="text-left text-gray-500">
                <th className="p-4">Booking ID</th>
                <th>Vendor</th>
                <th>Service</th>
                <th>Date / Time</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium text-gray-700">
                    {booking.id}
                  </td>
                  <td>{booking.vendor}</td>
                  <td>{booking.service}</td>
                  <td>{booking.date}</td>
                  <td>{booking.amount}</td>
                  <td>
                    {booking.status === "Held" ? (
                      <span className="text-yellow-600 font-medium">
                        ⚠️ Held
                      </span>
                    ) : (
                      <span className="text-green-600 font-medium">
                        ✅ Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 px-4 py-4">
          <button className="px-4 py-2 rounded-lg bg-gray-200 text-sm font-medium">
            Apply Selected Actions
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium">
            Save Settings
          </button>
        </div>
      </div>
    </section>
  );
}
