"use server";

import { getAccessToken } from "@/lib/session";
import { ActionResult } from "./admin-analytics";

export interface VendorProfile {
  _id: string;
  userId: string;
  businessProfile?: {
    businessName: string;
  };
  rate: number;
  isActive: boolean;
  onBoarded: boolean;
}

export interface PaginatedVendorsResponse {
  data: VendorProfile[];
  total: number;
  page: number;
  limit: number;
}

export async function getVendors(
  page: number = 1,
  limit: number = 20
): Promise<ActionResult<PaginatedVendorsResponse>> {
  try {
    const token = await getAccessToken();

    if (!token) {
      return { success: false, error: "Unauthorized: No access token found" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/vendors?page=${page}&limit=${limit}`, {
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
    console.error("Get Vendors Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}
