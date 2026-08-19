"use server";

import { getAccessToken } from "@/lib/session";
import { fetchWithAuthRetry } from "@/lib/auth-retry";

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
  adminPermissions?: string[];
}

export interface AdminPermission {
  name: string;
  modes: string[];
}

export interface AdminPermissionGroup {
  domain: string;
  label: string;
  permissions: AdminPermission[];
}

export interface RolesAndPermissions {
  roles: string[];
  vendorPermissions: AdminPermission[];
  adminPermissions: string[];
  adminPermissionGroups: AdminPermissionGroup[];
}

export async function getAdmins(
  page: number = 1,
  limit: number = 10,
  search?: string,
  status?: string
): Promise<ActionResult<AdminUser[]>> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) params.append("search", search);
    if (status && status !== "all") params.append("status", status);

    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}/api/v1/admin-management?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      })
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Failed to fetch admins" };
    }

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
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function getAdminById(id: string): Promise<ActionResult<AdminUser>> {
  try {
    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}/api/v1/admin-management/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      })
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Failed to fetch admin" };
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
    return { success: false, error: "An unexpected network error occurred." };
  }
}

export interface CreateAdminData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password?: string;
  permissions?: string[];
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
      const errorMessage = body.errors
        ? `${body.message}: ${JSON.stringify(body.errors)}`
        : body.message || `Error: ${response.statusText}`;

      return {
        success: false,
        error: errorMessage,
      };
    }

    const { revalidatePath } = await import("next/cache");
    revalidatePath("/settings");

    return {
      success: true,
      data: body.data,
    };
  } catch (error) {
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
  permissions?: string[];
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
      const errorMessage = body.errors
        ? `${body.message}: ${JSON.stringify(body.errors)}`
        : body.message || `Error: ${response.statusText}`;

      return {
        success: false,
        error: errorMessage,
      };
    }

    const { revalidatePath } = await import("next/cache");
    revalidatePath("/settings");

    return {
      success: true,
      data: body.data,
    };
  } catch (error) {
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
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function getRolesAndPermissions(): Promise<ActionResult<RolesAndPermissions>> {
  try {
    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}/api/v1/admin-management/roles-and-permissions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      })
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Failed to fetch roles and permissions" };
    }

    const body = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }

    return {
      success: true,
      data: body.data,
    };
  } catch (error) {
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}
