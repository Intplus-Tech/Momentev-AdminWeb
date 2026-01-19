"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";

interface Review {
  date: string;
  vendor: string;
  rating: string;
  review: string;
  status: number;
}

export default function ClientReviewsPage() {
  const router = useRouter();
  const { clientId } = useParams();

  const reviews: Review[] = [
    {
      date: "Oct 26, 2025",
      vendor: "Elegant Weddings",
      rating: "⭐⭐⭐⭐⭐",
      review:
        "Michael captured our wedding beautifully! Professional, punctual, and the photos exceeded expectations...",
      status: 3,
    },
    {
      date: "Oct 26, 2025",
      vendor: "London Catering",
      rating: "⭐⭐",
      review:
        "Excellent corporate event coverage. Delivered ahead of schedule with high-quality edits.",
      status: 5,
    },
    {
      date: "Oct 26, 2025",
      vendor: "Ira Motions",
      rating: "⭐⭐⭐",
      review:
        "Great engagement shoot! Minor editing delay but worth the wait.",
      status: 3,
    },
  ];

  return (
    <section className="min-h-screen bg-[#F4F5F8] px-4 md:px-8 py-6 space-y-6">
      {/* HEADER */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <h1 className="text-xl md:text-2xl font-semibold">
            CLIENT Profile management
          </h1>
        </div>

        <p className="text-sm text-gray-500">{clientId}</p>

        {/* TABS */}
        <div className="flex gap-8 border-b text-sm font-medium pt-4">
          <span
            onClick={() =>
              router.push(`/admin/clientprofile/${clientId}`)
            }
            className="cursor-pointer text-gray-500"
          >
            Overview
          </span>
          <span
            onClick={() =>
              router.push(`/admin/clientprofile/${clientId}/bookings`)
            }
            className="cursor-pointer text-gray-500"
          >
            Bookings
          </span>
          <span
            onClick={() =>
              router.push(`/admin/clientprofile/${clientId}/spending`)
            }
            className="cursor-pointer text-gray-500"
          >
            Spending
          </span>
          <span className="pb-2 border-b-2 border-red-500 text-black">
            Reviews
          </span>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="border-b">
              <tr className="text-left text-gray-500">
                <th className="p-4">Date</th>
                <th>Vendor</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((item, index) => (
                <tr
                  key={index}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  <td className="p-4">{item.date}</td>
                  <td className="font-medium">{item.vendor}</td>
                  <td>{item.rating}</td>
                  <td className="max-w-[420px] text-gray-600">
                    {item.review}
                  </td>

                  {/* STATUS WITH ICON */}
                  <td>
                    <div className="flex items-center gap-2 font-medium">
                      <ImageIcon size={16} className="text-gray-500" />
                      <span>{item.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <button className="px-4 py-2 rounded-lg bg-gray-200 text-sm font-medium">
          Apply Selected Actions
        </button>

        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium">
          Save Settings
        </button>
      </div>
    </section>
  );
}
