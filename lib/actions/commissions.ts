"use server";

import { getAccessToken } from "@/lib/session";
import { ActionResult } from "./admin-analytics";
import { revalidatePath } from "next/cache";

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

export async function createCommission(data: {
  type: "flat_rate" | "percentage";
  amount: number;
  currency: string;
}): Promise<ActionResult<Commission>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token found" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/commissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const body = await response.json();

    if (!response.ok) {
        // Handle explicit validation error format or generic message
        if (body.errors && body.errors.body?.fieldErrors) {
            const firstErrorField = Object.values(body.errors.body.fieldErrors)[0] as string[];
            if (firstErrorField && firstErrorField.length > 0) {
               return { success: false, error: firstErrorField[0] };
            }
        }
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }

    revalidatePath("/financial");
    return { success: true, data: body.data };
  } catch (error) {
    console.error("Create Commission Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function updateCommission(
  id: string,
  data: {
    amount?: number;
    currency?: string;
  }
): Promise<ActionResult<Commission>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token found" };
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/commissions/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const body = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }

    revalidatePath("/financial");
    return { success: true, data: body.data };
  } catch (error) {
    console.error("Update Commission Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function deleteCommission(id: string): Promise<ActionResult<any>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token found" };
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/commissions/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const body = await response.json();
    console.log("DELETE /commissions response body:", body);

    if (!response.ok) {
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }

    revalidatePath("/financial");
    return { success: true };
  } catch (error) {
    console.error("Delete Commission Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}
