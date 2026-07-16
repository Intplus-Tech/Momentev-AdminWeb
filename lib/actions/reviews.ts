"use server";

import { getAccessToken } from "@/lib/session";
import { fetchWithAuthRetry } from "@/lib/auth-retry";

interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  total?: number;
  page?: number;
  limit?: number;
}

export interface ReviewResponse {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  isFlagged?: boolean;
  reviewer: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

export async function getVendorReviews(
  vendorId: string,
  page: number = 1,
  limit: number = 100 // Fetch large amount for client-side sorting/filtering
): Promise<ActionResult<ReviewResponse[]>> {
  try {
    const url = `${process.env.BACKEND_URL}/api/v1/vendors/${vendorId}/reviews?page=${page}&limit=${limit}`;

    // Note: The Swagger shows this is a public endpoint (no auth required), but we'll include it if available just in case.
    const token = await getAccessToken();

    // Use retry helper if we have a token, otherwise make simple request
    if (token) {
      const { response, error } = await fetchWithAuthRetry((authToken) =>
        fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          cache: "no-store",
        })
      );

      if (error && !response.ok) {
        return { success: false, error: error || "Failed to fetch reviews" };
      }

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          success: false,
          error: body.message || `Error: ${response.statusText}`,
        };
      }

      return {
        success: true,
        data: body.data?.data || [],
        total: body.data?.total || 0,
        page: body.data?.page || 1,
        limit: body.data?.limit || 100,
      };
    } else {
      // Public endpoint fallback
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        return {
          success: false,
          error: body.message || `Error: ${res.statusText}`,
        };
      }

      return {
        success: true,
        data: body.data?.data || [],
        total: body.data?.total || 0,
        page: body.data?.page || 1,
        limit: body.data?.limit || 100,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export interface CustomerReviewResponse {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  vendorId?: {
    _id: string;
    id?: string;
    isActive?: boolean;
    rate?: number;
    reviewCount?: number;
    businessProfile?: {
      _id?: string;
      businessName?: string;
    } | null;
    profilePhoto?: {
      url?: string;
      originalName?: string;
    } | null;
  };
  reviewerUserId?: string;
  updatedAt?: string;
}

export async function getClientReviews(
  customerId: string,
  page: number = 1,
  limit: number = 20
): Promise<ActionResult<CustomerReviewResponse[]>> {
  try {
    const url = `${process.env.BACKEND_URL}/api/v1/customer-profile-management/${customerId}/reviews?page=${page}&limit=${limit}`;

    const token = await getAccessToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    } else {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const res = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        error: body.message || `Error: ${res.statusText}`,
      };
    }

    return {
      success: true,
      data: body.data?.data || [],
      total: body.data?.total || 0,
      page: body.data?.page || 1,
      limit: body.data?.limit || 20,
    };
  } catch {
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}
