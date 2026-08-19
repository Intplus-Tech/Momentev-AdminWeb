"use server";

import { fetchWithAuthRetry } from "@/lib/auth-retry";

export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// ─── Entity Types ─────────────────────────────────────────────────────────────

export interface PopulatedVendor {
  _id: string;
  businessName: string;
}

export interface PopulatedClient {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface SupportRequest {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  status: "pending" | "in_progress" | "resolved" | string;
  adminNotes?: string;
  vendorId: PopulatedVendor | string | null;
  clientId: PopulatedClient | string | null;
  archivedAt: string | null;
  archivedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedSupportRequests {
  data: SupportRequest[];
  total: number;
  page: number;
  limit: number;
}

// ─── Query Params ─────────────────────────────────────────────────────────────

export interface GetSupportRequestsParams {
  page?: number;
  limit?: number;
  sort?: string;
  includeArchived?: boolean;
}

// ─── Shared fetch helper ──────────────────────────────────────────────────────

async function parseBody(
  response: Response,
): Promise<Record<string, unknown> | null> {
  try {
    return (await response.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function authorizedRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<ActionResult<T>> {
  try {
    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}${path}`, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(init?.headers ?? {}),
        },
        cache: "no-store",
      }),
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Request failed" };
    }

    const body = await parseBody(response);

    if (!response.ok) {
      return {
        success: false,
        error: (body?.message as string) || `Error: ${response.statusText}`,
      };
    }

    return {
      success: true,
      data: (body?.data as T) ?? (body as T),
    };
  } catch (err) {
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

// ─── Actions ──────────────────────────────────────────────────────────────────

/**
 * 1. List all support requests (admin)
 * GET /api/v1/support-requests
 */
export async function getSupportRequests(
  params: GetSupportRequestsParams = {},
): Promise<ActionResult<PaginatedSupportRequests>> {
  const query = new URLSearchParams();

  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.sort) query.set("sort", params.sort);
  if (params.includeArchived) query.set("includeArchived", "true");

  const qs = query.toString();
  return authorizedRequest<PaginatedSupportRequests>(
    `/api/v1/support-requests${qs ? `?${qs}` : ""}`,
    { method: "GET" },
  );
}

/**
 * 2. Get single support request by ID
 * GET /api/v1/support-requests/:id
 */
export async function getSupportRequestById(
  id: string,
): Promise<ActionResult<SupportRequest>> {
  return authorizedRequest<SupportRequest>(
    `/api/v1/support-requests/${id}`,
    { method: "GET" },
  );
}

/**
 * 3. Update support request (e.g. change status)
 * PATCH /api/v1/support-requests/:id
 */
export async function updateSupportRequest(
  id: string,
  payload: { status?: string; adminNotes?: string },
): Promise<ActionResult<SupportRequest>> {
  try {
    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}/api/v1/support-requests/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }),
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Request failed" };
    }

    const body = await parseBody(response);

    if (!response.ok) {
      return {
        success: false,
        error: (body?.message as string) || (body?.error as string) || `Error: ${response.statusText}`,
      };
    }

    return {
      success: true,
      data: (body?.data as SupportRequest) ?? (body as unknown as SupportRequest),
    };
  } catch {
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

/**
 * 4. Archive (soft delete)
 * PATCH /api/v1/support-requests/:id/archive
 */
export async function archiveSupportRequest(
  id: string,
): Promise<ActionResult<SupportRequest>> {
  return authorizedRequest<SupportRequest>(
    `/api/v1/support-requests/${id}/archive`,
    { method: "PATCH" },
  );
}

/**
 * 5. Unarchive (restore)
 * PATCH /api/v1/support-requests/:id/unarchive
 */
export async function unarchiveSupportRequest(
  id: string,
): Promise<ActionResult<SupportRequest>> {
  return authorizedRequest<SupportRequest>(
    `/api/v1/support-requests/${id}/unarchive`,
    { method: "PATCH" },
  );
}

/**
 * 6. Hard delete
 * DELETE /api/v1/support-requests/:id
 */
export async function deleteSupportRequest(
  id: string,
): Promise<ActionResult<void>> {
  return authorizedRequest<void>(`/api/v1/support-requests/${id}`, {
    method: "DELETE",
  });
}
