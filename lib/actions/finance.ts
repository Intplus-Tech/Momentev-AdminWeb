"use server";

import { getAccessToken } from "@/lib/session";

// Re-use shared ActionResult from other actions
export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PlatformRevenueResponse {
    totalRevenue: number;
    commission: number;
    period: string; // "day" | "week" | "month" | "year" | "all-time"
}

export interface PendingPayout {
    _id: string;
    // Assuming structure based on typical Momentev API patterns. We can refine this if needed.
    vendorId: {
      _id: string;
      businessName: string;
    };
    amountMinor: number;
    status: string;
    currency: string;
    createdAt: string;
}

export interface PendingPayoutsResponse {
    payouts: PendingPayout[];
    total: number;
}

export async function getPlatformRevenue(
  period: "day" | "week" | "month" | "year" | "all-time" = "month"
): Promise<ActionResult<PlatformRevenueResponse>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token found" };
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/admin/revenue?period=${period}`,
      {
        method: "GET",
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

    return { success: true, data: body.data };
  } catch (error) {
    console.error("Get Platform Revenue Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function getPendingPayouts(): Promise<ActionResult<PendingPayoutsResponse>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token found" };
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/admin/payouts/pending`,
      {
        method: "GET",
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

    return { success: true, data: body.data };
  } catch (error) {
    console.error("Get Pending Payouts Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}
