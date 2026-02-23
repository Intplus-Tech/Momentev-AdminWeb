"use server";

import { getAccessToken } from "@/lib/session";
import { ActionResult } from "./admin-analytics";

export interface Commission {
  _id: string;
  type: "flat_rate" | "percentage";
  amount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedCommissionsResponse {
  data: Commission[];
  total: number;
  page: number;
  limit: number;
}

export async function getCommissions(
  page: number = 1,
  limit: number = 100
): Promise<ActionResult<PaginatedCommissionsResponse>> {
  try {
    const token = await getAccessToken();

    if (!token) {
      return { success: false, error: "Unauthorized: No access token found" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/commissions?page=${page}&limit=${limit}`, {
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
    console.error("Get Commissions Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}
