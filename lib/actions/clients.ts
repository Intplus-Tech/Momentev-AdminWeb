"use server";

import { getAccessToken } from "@/lib/session";

// Shared common response interface
interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  total?: number;
  page?: number;
  limit?: number;
}

export interface ClientAddress {
  _id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  long: number;
  lat: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClientAvatar {
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

export interface ClientProfile {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  role: string;
  status: string; // "active", "inactive", "banned", "pending_verification"
  emailVerified: boolean;
  authProvider: string;
  hasPassword: boolean;
  createdAt: string;
  updatedAt: string;
  lastActiveAt: string | null;
  lastLoginAt: string | null;
  customerFavoriteVendors?: string[];
  
  // Optional extended details (often available in getById)
  phoneNumber?: string | null;
  stripeCustomerId?: string | null;
  dateOfBirth?: string | null;
  addressId?: ClientAddress | null;
  avatar?: ClientAvatar | null;
  googleId?: string | null;
}

export async function getAdminClients(
  page: number = 1,
  limit: number = 10,
  search?: string,
  status?: string
): Promise<ActionResult<ClientProfile[]>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (search) params.append("search", search);
    if (status && status !== "all") params.append("status", status);

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin/clients?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const body = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }

    return {
      success: true,
      data: body.data.data, // The schema nests the array under data.data
      total: body.data.total,
      page: body.data.page,
      limit: body.data.limit,
    };
  } catch (error) {
    console.error("Get Admin Clients Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function getAdminClientById(id: string): Promise<ActionResult<ClientProfile>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin/clients/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const body = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }

    return { success: true, data: body.data };
  } catch (error) {
    console.error("Get Admin Client By ID Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}
