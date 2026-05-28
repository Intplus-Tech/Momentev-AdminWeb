"use server";

import { fetchWithAuthRetry } from "@/lib/auth-retry";
import { getAccessToken } from "@/lib/session";
import type {
  AdminActionResult,
  PaginatedPendingPayouts,
} from "@/types/admin";

export async function fetchPendingPayouts(
  page: number = 1,
  limit: number = 20
): Promise<AdminActionResult<PaginatedPendingPayouts>> {
  try {
    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}/api/v1/admin/payouts/pending?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      })
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Failed to fetch pending payouts" };
    }

    const body = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }

    console.log("Server raw pending payouts response:", JSON.stringify(body.data, null, 2));

    return { success: true, data: body.data };
  } catch (error) {
    console.error("Fetch Pending Payouts Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function releaseVendorPayout(
  bookingId: string
): Promise<AdminActionResult<{ message: string; data?: unknown }>> {
  try {
    const token = await getAccessToken();

    if (!token) {
      return { success: false, error: "Unauthorized: No access token found" };
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/admin/bookings/${bookingId}/release-payout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const body = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }

    return { success: true, data: body };
  } catch (error) {
    console.error("Release Vendor Payout Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}