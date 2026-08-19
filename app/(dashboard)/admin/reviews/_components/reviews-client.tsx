"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAdminReviews } from "@/lib/actions/admin-reviews";
import FilterToolbar from "./filter-toolbar";
import ReviewsTable from "./reviews-table";
import type { AdminReviewQueryParams } from "@/types/review";

export default function ReviewsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "20");
  const vendorId = searchParams.get("vendorId") || undefined;
  const reviewerUserId = searchParams.get("reviewerUserId") || undefined;
  const isFlaggedParam = searchParams.get("isFlagged");
  const isFlagged = isFlaggedParam === null ? undefined : isFlaggedParam === "true";
  const minRatingParam = searchParams.get("minRating");
  const maxRatingParam = searchParams.get("maxRating");
  const minRating = minRatingParam ? Number(minRatingParam) : undefined;
  const maxRating = maxRatingParam ? Number(maxRatingParam) : undefined;

  const params: AdminReviewQueryParams = useMemo(
    () => ({ page, limit, vendorId, reviewerUserId, isFlagged, minRating, maxRating }),
    [page, limit, vendorId, reviewerUserId, isFlagged, minRating, maxRating]
  );

  function handleFilterChange(key: string, value: string | null) {
    const next = new URLSearchParams(Array.from(searchParams.entries()));

    if (value === null || value === "") {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    // reset to first page when filters change
    next.set("page", "1");

    const qs = next.toString();
    const pathname = window.location.pathname;
    router.push(`${pathname}${qs ? `?${qs}` : ""}`);
  }

  const reviewsQuery = useQuery({
    queryKey: ["admin-reviews", page, vendorId, reviewerUserId, isFlagged, minRating, maxRating],
    queryFn: async () => {
      const result = await fetchAdminReviews(params);
      if (!result.success || !result.data) {
        throw new Error(result.error || "Failed to fetch admin reviews");
      }
      return result.data;
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Admin Reviews</h2>
          <p className="text-sm text-gray-500">Filters are reflected in the URL.</p>
        </div>
      </div>

      <FilterToolbar
        current={{ vendorId, reviewerUserId, isFlagged: isFlaggedParam, minRating: minRatingParam || undefined, maxRating: maxRatingParam || undefined }}
        onChange={(key, value) => handleFilterChange(key, value)}
        onClear={() => {
          const next = new URLSearchParams();
          const pathname = window.location.pathname;
          router.push(pathname);
        }}
      />

      <div className="mt-4">
        {reviewsQuery.isLoading ? (
          <div>Loading reviews...</div>
        ) : reviewsQuery.isError ? (
          <div className="text-red-600">{reviewsQuery.error instanceof Error ? reviewsQuery.error.message : "Failed to load reviews"}</div>
        ) : (
          <div>
            <p className="text-sm text-gray-600">Total: {reviewsQuery.data?.total ?? 0}</p>
            <ReviewsTable reviews={reviewsQuery.data?.data || []} />
          </div>
        )}
      </div>
    </div>
  );
}
