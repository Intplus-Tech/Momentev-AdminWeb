"use server";

import { getAccessToken } from "@/lib/session";

// Re-use shared ActionResult
interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  total?: number;
  page?: number;
  limit?: number;
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CustomerRequestAttachment {
  _id: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  extension: string;
  provider: string;
  uploadedBy: string;
  metadata?: {
    cloudId: string;
    folder: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BudgetAllocation {
  serviceSpecialtyId: string;
  budgetedAmount: number;
  _id: string;
}

export interface CustomerRequestEventDetails {
  title: string;
  startDate: string;
  endDate: string;
  guestCount: number;
  location: string;
  description: string;
}

export interface CustomerRequest {
  _id: string;
  serviceCategoryId: {
    _id: string;
    name: string;
  };
  customerId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  eventDetails: CustomerRequestEventDetails;
  budgetAllocations: BudgetAllocation[];
  attachments: CustomerRequestAttachment[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Query Params ────────────────────────────────────────────────────────────

export interface CustomerRequestQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  serviceCategoryId?: string;
  dateFrom?: string;
  dateTo?: string;
}

// ─── Server Action ───────────────────────────────────────────────────────────

export async function getCustomerRequests(
  params: CustomerRequestQueryParams = {}
): Promise<ActionResult<CustomerRequest[]>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const query = new URLSearchParams();
    query.set("page", (params.page ?? 1).toString());
    query.set("limit", (params.limit ?? 10).toString());

    if (params.search) query.set("search", params.search);
    if (params.status && params.status !== "all") query.set("status", params.status);
    if (params.serviceCategoryId && params.serviceCategoryId !== "all")
      query.set("serviceCategoryId", params.serviceCategoryId);
    if (params.dateFrom) query.set("dateFrom", params.dateFrom);
    if (params.dateTo) query.set("dateTo", params.dateTo);

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/customer-requests?${query.toString()}`,
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

    return {
      success: true,
      data: body.data.data,
      total: body.data.total,
      page: body.data.page,
      limit: body.data.limit,
    };
  } catch (error) {
    console.error("Get Customer Requests Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

// ─── Approve / Reject ────────────────────────────────────────────────────────

export async function approveRejectCustomerRequest(
  id: string,
  approve: boolean
): Promise<ActionResult<CustomerRequest>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/customer-requests/${id}/approve-reject`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ approve }),
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

    const { revalidatePath } = await import("next/cache");
    revalidatePath("/customer-requests");

    return { success: true, data: body.data };
  } catch (error) {
    console.error("Approve/Reject Customer Request Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

// ─── Broadcast Quote Request ─────────────────────────────────────────────────

export async function broadcastCustomerRequest(
  customerRequestId: string,
  expiresAt: string
): Promise<ActionResult<any>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/quote-requests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ customerRequestId, expiresAt }),
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

    const { revalidatePath } = await import("next/cache");
    revalidatePath("/customer-requests");

    console.log("Broadcast Quote Request Success:", body.data);                                                                                                                                                                       

    return { success: true, data: body.data };
  } catch (error) {
    console.error("Broadcast Quote Request Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}
