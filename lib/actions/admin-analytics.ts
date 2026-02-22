"use server";

import { getAccessToken } from "@/lib/session";
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
    date: string;
    revenueMinor: number;
    commissionMinor: number;
    paymentCount: number;
  }>;
  byPaymentModel: Array<{
    _id: string; // The payment model (e.g., "split_payout")
    revenueMinor: number;
    count: number;
  }>;
  revenueByRegion: any[];
  topVendors: Array<{
    vendorId: string;
    businessName: string;
    revenueMinor: number;
    bookingCount: number;
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
    const token = await getAccessToken();

    if (!token) {
      return { success: false, error: "Unauthorized: No access token found" };
    }

    // Build query params
    const query = new URLSearchParams();
    if (params?.from) query.append("from", params.from);
    if (params?.to) query.append("to", params.to);
    if (params?.currency) query.append("currency", params.currency);
    if (params?.limit) query.append("limit", params.limit.toString());
    
    const queryString = query.toString() ? `?${query.toString()}` : "";

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin/analytics/overview${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // Cache settings could go here depending on requirement, e.g. cache: 'no-store'
    });

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
