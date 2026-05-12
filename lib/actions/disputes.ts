"use server";

import { getAccessToken } from "@/lib/session";
import { fetchWithAuthRetry } from "@/lib/auth-retry";

export interface ActionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface EscalationLevelOption {
  level: number;
  value: string;
  label: string;
}

export interface EscalationReasonOption {
  value: string;
  label: string;
  requiresOtherText: boolean;
}

export interface DisputeTimelineItem {
  type: string;
  note: string;
  actorUserId: string;
  createdAt: string;
}

export interface DisputeSnapshot {
  _id: string;
  caseId: string;
  status: string;
  amountInDisputeMinor: number;
  currency: string;
  filedAt: string;
  closedAt?: string;
  client?: {
    userId: Record<string, any> | string;
    nameSnapshot: string;
    memberSince?: string;
    previousDisputes?: number;
  };
  vendor?: {
    vendorId: Record<string, any> | string;
    nameSnapshot: string;
    ratingSnapshot?: number;
    previousDisputes?: number;
  };
  booking?: {
    bookingId: Record<string, any> | string;
    dateSnapshot?: string;
    locationSnapshot?: string;
    paymentModelSnapshot?: string;
  };
  priority?: string;
  windowEndsAt?: string;
  reason?: {
    clientClaim?: string;
    vendorResponse?: string;
    requestedRefundPercent?: number;
    clientAttachments?: string[];
    vendorAttachments?: string[];
  };
  createdAt?: string;
  updatedAt?: string;
  timeline?: DisputeTimelineItem[];
}

export interface PaginatedDisputes {
  data: DisputeSnapshot[];
  total: number;
  page: number;
  limit: number;
}

export interface AdminSnapshot {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface DisputeEscalationRecord {
  _id: string;
  disputeId: DisputeSnapshot;
  requestedByAdminId: AdminSnapshot;
  escalationLevel: string;
  escalationReason: string;
  additionalContext?: string;
  urgencyLevel: "normal" | "high" | "critical";
  createdAt: string;
  updatedAt: string;
}

export interface DisputeResolutionRecord {
  _id: string;
  disputeId: DisputeSnapshot;
  caseId: string;
  resolvedByAdminId: AdminSnapshot;
  resolution: string;
  amountMinor: number;
  currency: string;
  resolvedAt: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedDisputeResolutions {
  data: DisputeResolutionRecord[];
  total: number;
  page: number;
  limit: number;
}

export interface EscalateDisputePayload {
  disputeId: string;
  escalationLevel: string;
  escalationReason: string;
  urgencyLevel: "normal" | "high" | "critical";
  additionalContext?: string;
  otherReason?: string;
}

export interface ResolveDisputePayload {
  disputeId: string;
  resolution: "partial_refund" | "vendor_credit" | "full_refund" | "deny" | "mediated";
  amountMinor?: number;
  currency?: string;
  notes?: string;
}

export interface GetDisputeResolutionsParams {
  page?: number;
  limit?: number;
  resolution?: "all" | "partial_refund" | "vendor_credit" | "full_refund" | "denied" | "mediated";
  vendorId?: string;
  from?: string;
  to?: string;
}

export interface GetDisputesParams {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  vendorId?: string;
  customerId?: string;
  bookingId?: string;
  from?: string;
  to?: string;
}

async function parseBody(response: Response): Promise<Record<string, unknown> | null> {
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
          ...(init?.headers || {}),
        },
        cache: "no-store",
      })
    );

    if (error && !response.ok) {
      return {
        success: false,
        error: error || "Request failed",
      };
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
      data: (body?.data as T) || (body as T),
    };
  } catch (error) {
    console.error("Disputes API request failed:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function getEscalationLevels(): Promise<ActionResult<EscalationLevelOption[]>> {
  return authorizedRequest<EscalationLevelOption[]>("/api/v1/admin/disputes/escalation-levels", {
    method: "GET",
  });
}

export async function getEscalationReasons(): Promise<ActionResult<EscalationReasonOption[]>> {
  return authorizedRequest<EscalationReasonOption[]>("/api/v1/admin/disputes/escalation-reasons", {
    method: "GET",
  });
}

export async function escalateDispute(
  payload: EscalateDisputePayload,
): Promise<ActionResult<DisputeEscalationRecord>> {
  return authorizedRequest<DisputeEscalationRecord>(
    `/api/v1/admin/disputes/${payload.disputeId}/escalate`,
    {
      method: "POST",
      body: JSON.stringify({
        escalationLevel: payload.escalationLevel,
        escalationReason: payload.escalationReason,
        urgencyLevel: payload.urgencyLevel,
        additionalContext: payload.additionalContext,
        otherReason: payload.otherReason,
      }),
    },
  );
}

export async function resolveDispute(
  payload: ResolveDisputePayload,
): Promise<ActionResult<DisputeResolutionRecord>> {
  return authorizedRequest<DisputeResolutionRecord>(
    `/api/v1/admin/disputes/${payload.disputeId}/resolve`,
    {
      method: "POST",
      body: JSON.stringify({
        resolution: payload.resolution,
        amountMinor: payload.amountMinor,
        currency: payload.currency,
        notes: payload.notes,
      }),
    },
  );
}

export async function getDisputeResolutions(
  params: GetDisputeResolutionsParams = {},
): Promise<ActionResult<PaginatedDisputeResolutions>> {
  const query = new URLSearchParams();

  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.resolution && params.resolution !== "all") query.set("resolution", params.resolution);
  if (params.vendorId?.trim()) query.set("vendorId", params.vendorId.trim());
  if (params.from?.trim()) query.set("from", params.from.trim());
  if (params.to?.trim()) query.set("to", params.to.trim());

  const queryString = query.toString();
  return authorizedRequest<PaginatedDisputeResolutions>(
    `/api/v1/admin/dispute-resolutions${queryString ? `?${queryString}` : ""}`,
    {
      method: "GET",
    },
  );
}

export async function getDisputes(
  params: GetDisputesParams = {},
): Promise<ActionResult<PaginatedDisputes>> {
  const query = new URLSearchParams();

  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.status && params.status !== "all") query.set("status", params.status);
  if (params.priority && params.priority !== "all") query.set("priority", params.priority);
  if (params.vendorId?.trim()) query.set("vendorId", params.vendorId.trim());
  if (params.customerId?.trim()) query.set("customerId", params.customerId.trim());
  if (params.bookingId?.trim()) query.set("bookingId", params.bookingId.trim());
  if (params.from?.trim()) query.set("from", params.from.trim());
  if (params.to?.trim()) query.set("to", params.to.trim());

  const queryString = query.toString();
  return authorizedRequest<PaginatedDisputes>(
    `/api/v1/admin/disputes${queryString ? `?${queryString}` : ""}`,
    {
      method: "GET",
    },
  );
}
