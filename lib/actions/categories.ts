"use server";

import { getAccessToken } from "@/lib/session";
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
    const token = await getAccessToken();

    if (!token) {
      return { success: false, error: "Unauthorized: No access token found" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/service-categories?page=${page}&limit=${limit}`, {
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
    console.error("Get Service Categories Error:", error);
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
    console.log(`[Update Category]: Triggered for ID ${id}`, data);
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
    console.log(`[Update Category]: Backend Response`, body);

    if (!response.ok) {
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }

    revalidatePath("/admin/categories");
    return { success: true, data: body.data };
  } catch (error) {
    console.error("Update Service Category Error:", error);
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
    console.log(`[Delete Category]: Triggered for ID ${id}`);
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
    console.log(`[Delete Category]: Backend Response`, body);

    if (!response.ok) {
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }

    revalidatePath("/admin/categories");
    return { success: true, data: { message: body.message } };
  } catch (error) {
    console.error("Delete Service Category Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}
