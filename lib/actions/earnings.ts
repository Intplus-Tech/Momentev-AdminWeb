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

export interface EarningFeeDetail {
  amount: number;
  application: string | null;
  currency: string;
  description: string;
  type: string;
}

export interface EarningResponse {
  id: string;
  object: string;
  amount: number;
  available_on: number;
  balance_type: string;
  created: number;
  currency: string;
  description: string | null;
  exchange_rate: number;
  fee: number;
  fee_details: EarningFeeDetail[];
  net: number;
  reporting_category: string;
  source: string;
  status: string;
  type: string;
}

export interface VendorEarningsData {
  vendorId: string;
  earnings: EarningResponse[];
  total: number;
}

export async function getVendorEarnings(
  vendorId: string
): Promise<ActionResult<VendorEarningsData>> {
  try {
    const url = `${process.env.BACKEND_URL}/api/v1/vendors/${vendorId}/earnings`;

    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
      data: body.data,
      total: body.data.total,
    };
  } catch (error) {
    console.error("Get Vendor Earnings Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}
