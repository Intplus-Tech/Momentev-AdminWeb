"use server";

import { getAccessToken } from "@/lib/session";

interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  total?: number;
  page?: number;
  limit?: number;
}

export interface BookingResponse {
  _id: string;
  vendorId: any;
  customerId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
  eventDetails: {
    title: string;
    startDate: string;
    endDate: string;
    guestCount: number;
    description: string;
  };
  budgetAllocations: any[];
  location: {
    addressText: string;
  };
  currency: string;
  amounts: {
    subtotal: number;
    fees: number;
    commission: number;
    total: number;
  };
  paymentModel: string;
  status: "pending" | "confirmed" | "completed" | "cancelled" | "rejected" | "pending_payment" | "paid";
  createdAt: string;
  updatedAt: string;
  payment: {
    provider: string;
    status: string;
    paymentIntentId: string;
  };
}

export async function getVendorBookings(
  vendorId: string,
  page: number = 1,
  limit: number = 10
): Promise<ActionResult<BookingResponse[]>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const url = `${process.env.BACKEND_URL}/api/v1/bookings/vendor/${vendorId}?page=${page}&limit=${limit}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
      data: body.data.data,
      total: body.data.total,
      page: body.data.page,
      limit: body.data.limit,
    };
  } catch (error) {
    console.error("Get Vendor Bookings Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export type BookingStatusFilter = "pending_payment" | "paid" | "confirmed" | "rejected" | "cancelled" | "completed" | "refunded" | "all" | "";

export async function getAdminClientBookings(
  clientId: string,
  page: number = 1,
  limit: number = 10,
  status?: BookingStatusFilter,
  from?: string,
  to?: string
): Promise<ActionResult<BookingResponse[]>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (status && status !== "all") params.append("status", status);
    if (from) params.append("from", from);
    if (to) params.append("to", to);

    const url = `${process.env.BACKEND_URL}/api/v1/admin/clients/${clientId}/bookings?${params.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
      data: body.data.data,
      total: body.data.total,
      page: body.data.page,
      limit: body.data.limit,
    };
  } catch (error) {
    console.error("Get Admin Client Bookings Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export interface AdminBookingItem {
  _id: string;
  customerRequestId: {
    _id: string;
    eventDetails: {
      title: string;
      startDate: string;
      endDate: string;
      guestCount: number;
      location?: string;
      description?: string;
    };
    serviceCategoryId: string | { _id: string; name: string; icon?: string };
  };
  quoteId: string;
  vendorId: {
    _id: string;
    businessProfile?: string; // Sometimes populated, sometimes just ID
    paymentModel?: string;
  } | any; // To handle both populated and unpopulated depending on backend
  customerId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
  } | any;
  eventDetails: {
    title: string;
    startDate: string;
    endDate?: string;
    guestCount?: number;
    description?: string;
  };
  location?: {
    addressText: string;
  };
  currency: string;
  amounts: {
    subtotal: number;
    fees: number;
    commission: number;
    total: number;
  };
  paymentModel: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  payment?: {
    provider: string;
    status: string;
    paymentIntentId?: string;
  };
}

export interface AdminBookingsResponse {
  data: AdminBookingItem[];
  total?: number;
  page?: number;
  limit?: number;
}

export async function getAdminBookings(
    page: number = 1,
    limit: number = 10,
    status: string = "all",
    vendorId?: string,
    customerId?: string,
    from?: string,
    to?: string
): Promise<ActionResult<AdminBookingsResponse>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token found" };
    }

    const query = new URLSearchParams();
    query.append("page", page.toString());
    query.append("limit", limit.toString());
    
    if (status && status !== "all" && status !== "--") query.append("status", status);
    if (vendorId && vendorId.trim() !== "") query.append("vendorId", vendorId);
    if (customerId && customerId.trim() !== "") query.append("customerId", customerId);
    if (from) query.append("from", from);
    if (to) query.append("to", to);
    
    const queryString = query.toString() ? `?${query.toString()}` : "";

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/admin/bookings${queryString}`,
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
    console.error("Get Admin Bookings Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}
