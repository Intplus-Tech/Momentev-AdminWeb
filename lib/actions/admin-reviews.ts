"use server";

import { fetchWithAuthRetry } from "@/lib/auth-retry";
import { AdminActionResult } from "@/types/admin";
import type { AdminReviewQueryParams, PaginatedReviewsResponse, Review } from "@/types/review";

/**
 * Fetch admin reviews with optional filters
 */
export async function fetchAdminReviews(
  params: AdminReviewQueryParams = {}
): Promise<AdminActionResult<PaginatedReviewsResponse>> {
  try {
    const search = new URLSearchParams();

    if (params.page !== undefined) search.append("page", String(params.page));
    if (params.limit !== undefined) search.append("limit", String(params.limit));
    if (params.vendorId) search.append("vendorId", params.vendorId);
    if (params.reviewerUserId) search.append("reviewerUserId", params.reviewerUserId);
    if (params.isFlagged !== undefined) search.append("isFlagged", String(params.isFlagged));
    if (params.minRating !== undefined) search.append("minRating", String(params.minRating));
    if (params.maxRating !== undefined) search.append("maxRating", String(params.maxRating));

    const url = `${process.env.BACKEND_URL}/api/v1/admin/reviews${search.toString() ? `?${search.toString()}` : ""}`;

    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      })
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Failed to fetch admin reviews" };
    }

    const body = await response.json().catch(() => null);

    if (!response.ok) {
      return { success: false, error: body?.message || `Error: ${response.statusText}` };
    }

    // Expect backend to return { data, total, page, limit }
    return { success: true, data: body.data };
  } catch (err) {
    console.error("Fetch Admin Reviews Error:", err);
    return { success: false, error: "An unexpected network error occurred." };
  }
}

/**
 * Flag or unflag a review
 */
export async function flagReview(reviewId: string, isFlagged: boolean): Promise<AdminActionResult<Review>> {
  try {
    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}/api/v1/admin/reviews/${reviewId}/flag`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isFlagged }),
        cache: "no-store",
      })
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Failed to flag review" };
    }

    const body = await response.json().catch(() => null);

    if (!response.ok) {
      return { success: false, error: body?.message || `Error: ${response.statusText}` };
    }

    return { success: true, data: body.data };
  } catch (err) {
    console.error("Flag Review Error:", err);
    return { success: false, error: "An unexpected network error occurred." };
  }
}

/**
 * Delete a review permanently
 */
export async function deleteReview(reviewId: string): Promise<AdminActionResult<{ message?: string }>> {
  try {
    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}/api/v1/admin/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      })
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Failed to delete review" };
    }

    const body = await response.json().catch(() => null);

    if (!response.ok) {
      return { success: false, error: body?.message || `Error: ${response.statusText}` };
    }

    return { success: true, data: body.data || { message: body.message } };
  } catch (err) {
    console.error("Delete Review Error:", err);
    return { success: false, error: "An unexpected network error occurred." };
  }
}
