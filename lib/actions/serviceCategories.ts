"use server";

import { getAccessToken } from "@/lib/session";
import { revalidatePath } from "next/cache";
import type {
  ServiceCategory,
  PaginatedServiceCategories,
} from "@/types/serviceCategory";


/* =======================
   Types
======================= */

// export interface ServiceCategory {
//   id: string;
//   name: string;
//   icon: string;
//   suggestedTags: string[];
//   createdAt: string;
//   updatedAt: string;
// }

// export interface PaginatedServiceCategories {
//   data: ServiceCategory[];
//   page: number;
//   limit: number;
//   total: number;
// }

export interface ActionResult<T > {
  success: boolean;
  data?: T;
  error?: string;
}

const BASE_URL = process.env.BACKEND_URL;

/* =======================
   GET: All Categories
======================= */

export async function getServiceCategories(
  page = 1,
  limit = 10
): Promise<ActionResult<PaginatedServiceCategories>> {
  try {
    const token = await getAccessToken();

    if (!token) {
      return { success: false, error: "Unauthorized" };
    }

    const res = await fetch(
      `${BASE_URL}/api/v1/service-categories?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.message || "Failed to fetch categories",
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("Get Service Categories Error:", error);
    return {
      success: false,
      error: "Network error occurred",
    };
  }
}

/* =======================
   POST: Create Category
======================= */

export async function createServiceCategory(payload: {
  name: string;
  icon: string;
  suggestedTags: string[];
}): Promise<ActionResult<ServiceCategory>> {
  try {
    const token = await getAccessToken();

    if (!token) {
      return { success: false, error: "Unauthorized" };
    }

    const res = await fetch(`${BASE_URL}/api/v1/service-categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.message || "Failed to create category",
      };
    }

    // ✅ Revalidate categories page AFTER success
    revalidatePath("/categories");

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("Create Service Category Error:", error);
    return {
      success: false,
      error: "Network error occurred",
    };
  }
}

/* =======================
   PUT: Update Category
======================= */

export async function updateServiceCategory(
  id: string,
  payload: {
    name: string;
    icon: string;
    suggestedTags: string[];
  }
): Promise<ActionResult<ServiceCategory>> {
  try {
    const token = await getAccessToken();

    if (!token) {
      return { success: false, error: "Unauthorized" };
    }

    const res = await fetch(`${BASE_URL}/api/v1/service-categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.message || "Failed to update category",
      };
    }

    // ✅ Revalidate categories page AFTER success
    revalidatePath("/categories");

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("Update Service Category Error:", error);
    return {
      success: false,
      error: "Network error occurred",
    };
  }
}

/* =======================
   DELETE: Category
======================= */

export async function deleteServiceCategory(
  id: string
): Promise<ActionResult<null>> {
  try {
    const token = await getAccessToken();

    if (!token) {
      return { success: false, error: "Unauthorized" };
    }

    const res = await fetch(`${BASE_URL}/api/v1/service-categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.message || "Failed to delete category",
      };
    }

    // ✅ Revalidate categories page AFTER success
    revalidatePath("/categories");

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    console.error("Delete Service Category Error:", error);
    return {
      success: false,
      error: "Network error occurred",
    };
  }
}
