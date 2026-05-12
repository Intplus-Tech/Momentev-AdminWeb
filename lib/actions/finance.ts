"use server";

import { getAccessToken } from "@/lib/session";
import { fetchWithAuthRetry } from "@/lib/auth-retry";

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
  bookingId: string;
  paymentIntentId: string;
  paidAt: string;
  bookingStatus: string;
  amountMinor: number;
  commissionMinor: number;
  vendorPayoutMinor: number;
  currency: string;
  customer: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  vendor: {
    _id: string;
    businessName: string;
    hasPayoutAccount: boolean;
    owner: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}

export interface PendingPayoutsResponse {
  data: PendingPayout[];
  total: number;
  page: number;
  limit: number;
}

export async function getPlatformRevenue(
  period: "day" | "week" | "month" | "year" | "all-time" = "month"
): Promise<ActionResult<PlatformRevenueResponse>> {
  try {
    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}/api/v1/admin/revenue?period=${period}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      })
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Failed to fetch platform revenue" };
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
    console.error("Get Platform Revenue Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function getPendingPayouts(
  page: number = 1,
  limit: number = 20
): Promise<ActionResult<PendingPayoutsResponse>> {
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




    return { success: true, data: body.data };
  } catch (error) {
    console.error("Get Pending Payouts Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export interface PaymentQueueItem {
  bookingId: string;
  transactionId: string;
  paymentIntentId: string;
  transferId: string | null;
  createdAt: string;
  paidAt: string | null;
  releasedAt: string | null;
  amountMinor: number;
  currency: string;
  status: {
    queue: string;
    booking: string;
    payment: string;
  };
  customer: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  vendor: {
    _id: string;
    businessName: string;
    owner: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    };
  };
  actions: {
    canRefund: boolean;
    canReleasePayout: boolean;
  };
}

export interface PaymentQueueResponse {
  data: PaymentQueueItem[];
  total: number;
  page: number;
  limit: number;
}

export async function getPaymentQueue(params?: {
  page?: number;
  limit?: number;
  status?: string;
  vendorId?: string;
  customerId?: string;
  bookingStatus?: string;
  paymentStatus?: string;
  from?: string;
  to?: string;
}): Promise<ActionResult<PaymentQueueResponse>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token found" };
    }

    const query = new URLSearchParams();
    if (params?.page) query.append("page", params.page.toString());
    if (params?.limit) query.append("limit", params.limit.toString());
    if (params?.status && params.status !== "all" && params.status !== "--") query.append("status", params.status);
    if (params?.vendorId && params.vendorId.trim() !== "") query.append("vendorId", params.vendorId);
    if (params?.customerId && params.customerId.trim() !== "") query.append("customerId", params.customerId);
    if (params?.bookingStatus && params.bookingStatus !== "--") query.append("bookingStatus", params.bookingStatus);
    if (params?.paymentStatus && params.paymentStatus !== "--") query.append("paymentStatus", params.paymentStatus);
    if (params?.from) query.append("from", params.from);
    if (params?.to) query.append("to", params.to);

    const queryString = query.toString() ? `?${query.toString()}` : "";

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/admin/payment-queue${queryString}`,
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
    console.error("Get Payment Queue Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function syncStripePaymentStatuses(): Promise<ActionResult> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token found" };
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/admin/payment-queue/sync-stripe`,
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
    console.error("Sync Stripe Payment Statuses Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}
