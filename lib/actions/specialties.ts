"use server";

import { getAccessToken } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { ActionResult } from "./admin-analytics";

export interface ServiceSpecialty {
  _id: string;
  name: string;
  serviceCategoryId: string;
  description: string;
  commissionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedSpecialtiesResponse {
  data: ServiceSpecialty[];
  total: number;
  page: number;
  limit: number;
}

export async function getServiceSpecialties(
  page: number = 1,
  limit: number = 1000
): Promise<ActionResult<PaginatedSpecialtiesResponse>> {
  try {
    const token = await getAccessToken();

    if (!token) {
      return { success: false, error: "Unauthorized: No access token found" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/service-specialties?page=${page}&limit=${limit}`, {
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
    console.error("Get Service Specialties Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function getServiceSpecialtiesByCategory(
  categoryId: string
): Promise<ActionResult<{ message: string; data: ServiceSpecialty[] }>> {
  try {
    const token = await getAccessToken();

    if (!token) {
      return { success: false, error: "Unauthorized: No access token found" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/service-specialties/by-category/${categoryId}`, {
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

    return { success: true, data: body };
  } catch (error) {
    console.error("Get Service Specialties By Category Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function updateServiceSpecialty(
  id: string,
  payload: { name?: string; description?: string }
): Promise<ActionResult<ServiceSpecialty>> {
  try {
    const token = await getAccessToken();
    if (!token) return { success: false, error: "Unauthorized: No access token found" };

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/service-specialties/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const body = await response.json();

    if (!response.ok) {
      return { success: false, error: body.message || `Error: ${response.statusText}` };
    }

    revalidatePath("/admin/categories");
    return { success: true, data: body.data };
  } catch (error) {
    console.error("Update Service Specialty Error:", error);
    return { success: false, error: "An unexpected network error occurred." };
  }
}

export async function deleteServiceSpecialty(id: string): Promise<ActionResult<void>> {
  try {
    const token = await getAccessToken();
    if (!token) return { success: false, error: "Unauthorized" };

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/service-specialties/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const body = await response.json();
      return { success: false, error: body.message || `Error: ${response.statusText}` };
    }

    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error) {
    console.error("Delete Service Specialty Error:", error);
    return { success: false, error: "An unexpected network error occurred." };
  }
}
