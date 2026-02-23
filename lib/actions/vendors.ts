"use server";

import { getAccessToken } from "@/lib/session";
import { ActionResult } from "./admin-analytics";

export interface VendorProfile {
  _id: string;
  id: string; // The backend sometimes duplicates `_id` into `id`
  userId: {
    _id: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: string;
  };
  businessProfile?: {
    _id: string;
    businessName: string;
    companyRegNo?: string;
    businessRegType?: string;
    contactInfo?: {
      primaryContactName: string;
      emailAddress: string;
      phoneNumber: string;
    };
  };
  commissionAgreement?: {
    accepted: boolean;
    commissionType?: string;
    commissionAmount?: number;
    currency?: string;
  };
  profilePhoto?: {
    url: string;
  } | null;
  coverPhoto?: {
    url: string;
  } | null;
  rate: number;
  reviewCount: number;
  isActive: boolean;
  onBoardingStage: number;
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

export async function getAdminVendors(
  page: number = 1,
  limit: number = 20,
  search?: string,
  isActive?: boolean,
  onBoarded?: boolean
): Promise<ActionResult<PaginatedVendorsResponse>> {
  try {
    const token = await getAccessToken();

    if (!token) {
      return { success: false, error: "Unauthorized: No access token found" };
    }

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (search) params.append("search", search);
    if (isActive !== undefined) params.append("isActive", String(isActive));
    if (onBoarded !== undefined) params.append("onBoarded", String(onBoarded));

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin/vendors?${params.toString()}`, {
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
    console.error("Get Admin Vendors Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}
