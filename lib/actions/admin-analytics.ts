"use server";

import { getAccessToken } from "@/lib/session";
import { fetchWithAuthRetry } from "@/lib/auth-retry";
import { revalidatePath } from "next/cache";

export interface AnalyticsOverviewResponse {
  range: {
    from: string;
    to: string;
  };
  currency: string;
  performance: {
    totalRevenueMinor: number;
    pendingPayoutMinor: number;
    activeEscrowMinor: number;
    platformCommissionMinor: number;
    disputedFundsMinor: number;
    disputedCases: number;
  };
  revenueAnalytics: Array<{
    name: string;
    amountMinor: number;
    pct: number;
  }>;
  byPaymentModel: Array<{
    model: string;
    amountMinor: number;
    pct: number;
  }>;
  revenueByRegion: Array<{
    region: string;
    amountMinor: number;
    pct: number;
  }>;
  topVendors: Array<{
    vendorId: string;
    vendorName: string;
    amountMinor: number;
    bookings: number;
    growthPct: number;
  }>;
  todaysPayments: {
    successful: { count: number; amountMinor: number };
    failed: { count: number; amountMinor: number };
    pending: { count: number; amountMinor: number };
    successRatePct: number;
  };
  paymentMethods: {
    items: Array<{
      method: string;
      count: number;
      pct: number;
    }>;
    note: string;
  };
}

export interface ActionResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function getAnalyticsOverview(
  params?: {
    from?: string;
    to?: string;
    currency?: string;
    limit?: number;
  }
): Promise<ActionResult<AnalyticsOverviewResponse>> {
  try {
    // Build query params
    const query = new URLSearchParams();
    if (params?.from) query.append("from", params.from);
    if (params?.to) query.append("to", params.to);
    if (params?.currency) query.append("currency", params.currency);
    if (params?.limit) query.append("limit", params.limit.toString());

    const queryString = query.toString() ? `?${query.toString()}` : "";

    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}/api/v1/admin/analytics/overview${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Failed to fetch analytics" };
    }

    const body = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }

    // Typical Momentev API responses have the data wrapped in `{ message: string, data: T }`
    return { success: true, data: body.data };
  } catch (error) {
    console.error("Get Analytics Overview Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export interface BookingTrendsResponse {
  period: string;
  currency: string;
  range: {
    from: string;
    to: string;
  };
  series: Array<{
    periodStart: string;
    bookingsCount: number;
    revenueMinor: number;
    commissionMinor: number;
  }>;
}

export async function getBookingTrends(
  params?: {
    from?: string;
    to?: string;
    period?: string;
    currency?: string;
  }
): Promise<ActionResult<BookingTrendsResponse>> {
  try {
    const query = new URLSearchParams();
    if (params?.from) query.append("from", params.from);
    if (params?.to) query.append("to", params.to);
    if (params?.period) query.append("period", params.period);
    if (params?.currency) query.append("currency", params.currency);

    const queryString = query.toString() ? `?${query.toString()}` : "";

    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}/api/v1/admin/analytics/booking-trends${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Failed to fetch booking trends" };
    }

    const body = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }

    return { success: true, data: body.data };
  } catch (error) {
    console.error("Get Booking Trends Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}
