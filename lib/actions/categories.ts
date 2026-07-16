"use server";

import { getAccessToken } from "@/lib/session";
import { fetchWithAuthRetry } from "@/lib/auth-retry";
import { revalidatePath } from "next/cache";
import { ActionResult } from "./admin-analytics";

export interface ServiceCategory {
  _id: string;
  name: string;
  icon: string;
  suggestedTags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedCategoriesResponse {
  data: ServiceCategory[];
  total: number;
  page: number;
  limit: number;
}

export async function getServiceCategories(
  page: number = 1,
  limit: number = 10
): Promise<ActionResult<PaginatedCategoriesResponse>> {
  try {
    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}/api/v1/service-categories?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      })
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Failed to fetch service categories" };
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
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function createServiceCategory(
  data: { name: string; icon: string; suggestedTags: string[] }
): Promise<ActionResult<ServiceCategory>> {
  try {
    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}/api/v1/service-categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Failed to create service category" };
    }

    const body = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }

    revalidatePath("/admin/categories");
    return { success: true, data: body.data };
  } catch (error) {
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function updateServiceCategory(
  id: string,
  data: { name: string; icon: string; suggestedTags: string[] }
): Promise<ActionResult<ServiceCategory>> {
  try {
    const token = await getAccessToken();

    if (!token) {
      return { success: false, error: "Unauthorized: No access token found" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/service-categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const body = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }

    revalidatePath("/admin/categories");
    return { success: true, data: body.data };
  } catch (error) {
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function deleteServiceCategory(
  id: string
): Promise<ActionResult<{ message: string }>> {
  try {
    const token = await getAccessToken();

    if (!token) {
      return { success: false, error: "Unauthorized: No access token found" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/service-categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }

    revalidatePath("/admin/categories");
    return { success: true, data: { message: body.message } };
  } catch (error) {
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}
