"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

/* ================= TYPES ================= */

interface ReviewTabProps {
  vendorId: string;
}

interface ReviewItem {
  date: string;
  client: string;
  rating: 1 | 2 | 3 | 4 | 5;
  review?: string;
  mediaCount: number;
  status: "Published" | "Flagged" | "Under Review";
}

/* ================= MOCK DATA ================= */

// Replace with API fetch using vendorId in production
const reviews: ReviewItem[] = [
  {
    date: "Oct 26, 2025",
    client: "Sarah Johnson",
    rating: 5,
    review: "Excellent service!",
    mediaCount: 3,
    status: "Published",
  },
  {
    date: "Oct 26, 2025",
    client: "James Wilson",
    rating: 2,
    review: "Not satisfied",
    mediaCount: 5,
    status: "Flagged",
  },
  {
    date: "Oct 26, 2025",
    client: "Maria Garcia",
    rating: 3,
    review: "Good experience",
    mediaCount: 3,
    status: "Under Review",
  },
];

/* ================= COMPONENT ================= */

export default function ReviewTab({ vendorId }: ReviewTabProps) {
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  // Filtered reviews by selected rating
  const filteredReviews = useMemo(() => {
    if (!ratingFilter) return reviews;
    return reviews.filter((r) => r.rating === ratingFilter);
  }, [ratingFilter]);

  // Compute rating summary
  const ratingSummary = useMemo(() => {
    const counts = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((r) => r.rating === star).length,
    }));
    const total = reviews.length || 1;
    return counts.map((c) => ({
      ...c,
      percentage: Math.round((c.count / total) * 100),
    }));
  }, []);

  return (
    <div className="space-y-6">
      {/* ================= RATING FILTERS ================= */}
      <div className="flex flex-wrap gap-3">
        {ratingSummary.map((r) => (
          <button
            key={r.star}
            onClick={() =>
              setRatingFilter(ratingFilter === r.star ? null : r.star)
            }
            className={`px-4 py-2 rounded-md border text-sm ${ratingFilter === r.star
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-800"
              }`}
          >
            {r.star} Stars: {"⭐".repeat(r.star)} ({r.count}) {r.percentage}%
          </button>
        ))}
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-xl overflow-x-auto">
        <table className="min-w-[1000px] w-full text-sm">
          <thead className="border-b">
            <tr className="text-left text-gray-600">
              <th className="p-4">Date</th>
              <th className="p-4">Client</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Review</th>
              <th className="p-4">Media</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredReviews.map((item, idx) => (
              <tr key={idx} className="border-b last:border-0">
                <td className="p-4">{item.date}</td>
                <td className="p-4">{item.client}</td>
                <td className="p-4">{"⭐".repeat(item.rating)}</td>
                <td className="p-4">{item.review || "-"}</td>
                <td className="p-4">{item.mediaCount}</td>
                <td className="p-4">
                  {item.status === "Published" && (
                    <span className="flex items-center gap-1 text-green-600">
                      <span className="w-4 h-4 bg-green-600 rounded-full flex-shrink-0" />
                      {item.status}
                    </span>
                  )}
                  {item.status === "Flagged" && (
                    <span className="flex items-center gap-1 text-orange-500">
                      <span className="w-4 h-4 bg-orange-500 rounded-full flex-shrink-0" />
                      {item.status}
                    </span>
                  )}
                  {item.status === "Under Review" && (
                    <span className="flex items-center gap-1 text-gray-500">
                      <span className="w-4 h-4 border rounded-full flex-shrink-0 flex items-center justify-center text-xs">
                        🔍
                      </span>
                      {item.status}
                    </span>
                  )}
                </td>
                <td className="p-4 text-blue-600">
                  <ActionDropdown />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= ACTION DROPDOWN ================= */

function ActionDropdown() {
  const [open, setOpen] = useState(false);

  const actions = ["View", "Flag", "Reply"];

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="underline text-sm"
      >
        Actions
      </button>
      {open && (
        <div className="absolute right-0 mt-1 bg-white border rounded-md shadow z-20">
          {actions.map((act) => (
            <button
              key={act}
              onClick={() => setOpen(false)}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              {act}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
