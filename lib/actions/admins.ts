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

export interface AdminUser {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  role: string;
  status: string;
  emailVerified: boolean;
  authProvider: string;
  hasPassword: boolean;
  createdAt: string;
  updatedAt: string;
  lastActiveAt: string | null;
  lastLoginAt: string | null;
  rootAdmin: boolean;
  customerFavoriteVendors?: string[];
}

export async function getAdmins(
  page: number = 1,
  limit: number = 10,
  search?: string,
  status?: string
): Promise<ActionResult<AdminUser[]>> {
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

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin-management?${params.toString()}`, {
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
      data: body.data.data,
      total: body.data.total,
      page: body.data.page,
      limit: body.data.limit,
    };
  } catch (error) {
    console.error("Get Admins Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export interface CreateAdminData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string;
}

export async function createAdmin(data: CreateAdminData): Promise<ActionResult<AdminUser>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin-management`, {
      method: "POST",
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

    const { revalidatePath } = await import("next/cache");
    revalidatePath("/settings");

    return {
      success: true,
      data: body.data,
    };
  } catch (error) {
    console.error("Create Admin Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export interface UpdateAdminData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export async function updateAdmin(id: string, data: UpdateAdminData): Promise<ActionResult<AdminUser>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin-management/${id}`, {
      method: "PATCH",
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

    const { revalidatePath } = await import("next/cache");
    revalidatePath("/settings");

    return {
      success: true,
      data: body.data,
    };
  } catch (error) {
    console.error("Update Admin Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function deleteAdmin(id: string): Promise<ActionResult<null>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin-management/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Handle generic empty 204 response or JSON from the server
    let body;
    if (response.status !== 204) {
      body = await response.json();
    }

    if (!response.ok) {
      return {
        success: false,
        error: body?.message || `Error: ${response.statusText}`,
      };
    }

    const { revalidatePath } = await import("next/cache");
    revalidatePath("/settings");

    return { success: true };
  } catch (error) {
    console.error("Delete Admin Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function deactivateAdmin(id: string): Promise<ActionResult<AdminUser>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin-management/${id}/deactivate`, {
      method: "PATCH",
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

    const { revalidatePath } = await import("next/cache");
    revalidatePath("/settings");

    return { success: true, data: body.data };
  } catch (error) {
    console.error("Deactivate Admin Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function reactivateAdmin(id: string): Promise<ActionResult<AdminUser>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin-management/${id}/reactivate`, {
      method: "PATCH",
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

    const { revalidatePath } = await import("next/cache");
    revalidatePath("/settings");

    return { success: true, data: body.data };
  } catch (error) {
    console.error("Reactivate Admin Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}
