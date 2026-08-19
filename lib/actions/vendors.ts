"use server";

import { getAccessToken } from "@/lib/session";
import { fetchWithAuthRetry } from "@/lib/auth-retry";
import { ActionResult } from "./admin-analytics";

export interface VendorProfile {
  _id: string;
  id: string; // The backend sometimes duplicates `_id` into `id`
  userId: {
    _id: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: string;
  };
  businessProfile?: {
    _id: string;
    businessName: string;
    yearInBusiness?: string;
    companyRegNo?: string;
    businessRegType?: string;
    businessDescription?: string;
    contactInfo?: {
      primaryContactName: string;
      emailAddress: string;
      phoneNumber: string;
      meansOfIdentification?: string;
      addressId?:
      | string
      | {
        _id?: string;
        id?: string;
        street?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
      };
    };
    serviceArea?: {
      travelDistance?: string;
      areaNames?: { city: string; state?: string; country?: string }[];
    };
  };
  commissionAgreement?: {
    accepted: boolean;
    commissionType?: string;
    commissionAmount?: number;
    currency?: string;
  };
  profilePhoto?: {
    url: string;
  } | null;
  coverPhoto?: {
    url: string;
  } | null;
  socialMediaLinks?: {
    name: string;
    link: string;
  }[];
  rate: number;
  reviewCount: number;
  isActive: boolean;
  onBoardingStage: number;
  onBoarded: boolean;
  vendorStatus?: "active" | "suspended" | "banned";
  suspensionReason?: string;
}

export interface PaginatedVendorsResponse {
  data: VendorProfile[];
  total: number;
  page: number;
  limit: number;
}

export async function getVendors(
  page: number = 1,
  limit: number = 20
): Promise<ActionResult<PaginatedVendorsResponse>> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}/api/v1/vendors?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      })
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Failed to fetch vendors" };
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

export async function getAdminVendors(
  page: number = 1,
  limit: number = 20,
  search?: string,
  isActive?: boolean,
  onBoarded?: boolean
): Promise<ActionResult<PaginatedVendorsResponse>> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) params.append("search", search);
    if (isActive !== undefined) params.append("isActive", String(isActive));
    if (onBoarded !== undefined) params.append("onBoarded", String(onBoarded));

    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}/api/v1/admin/vendors?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      })
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Failed to fetch vendors" };
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

export async function getAdminVendorById(id: string): Promise<ActionResult<VendorProfile>> {
  try {
    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}/api/v1/admin/vendors/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      })
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Failed to fetch vendor" };
    }

    const body = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }

    // Single vendor profiles are usually wrapped in body.data from Momentev API
    return { success: true, data: body.data };
  } catch (error) {
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export interface VendorService {
  _id: string;
  vendorId: string;
  serviceCategory: {
    _id: string;
    name: string;
    icon: string;
    suggestedTags: string[];
  };
  tags: string[];
  minimumBookingDuration?: string;
  leadTimeRequired?: string;
  maximumEventSize?: string;
  additionalFees?: {
    _id: string;
    name: string;
    price: string | number;
    feeCategory: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface VendorSpecialty {
  _id: string;
  vendorId: string;
  serviceSpecialty: {
    _id: string;
    name: string;
    description: string;
    serviceCategoryId: string;
    commissionId: string;
  };
  priceCharge: string;
  price: string | number;
  createdAt: string;
  updatedAt: string;
}

export async function getAdminVendorServices(vendorId: string): Promise<ActionResult<VendorService[]>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin/vendors/${vendorId}/services`, {
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

    return { success: true, data: body.data?.data || [] };
  } catch (error) {
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function getAdminVendorSpecialties(vendorId: string): Promise<ActionResult<VendorSpecialty[]>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/admin/vendors/${vendorId}/specialties`, {
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

    return { success: true, data: body.data?.data || [] };
  } catch (error) {
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function updateVendor(vendorId: string, data: Partial<VendorProfile>): Promise<ActionResult<any>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/vendors/${vendorId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
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
    return {
      success: false,
      error: "An unexpected network error occurred during vendor update.",
    };
  }
}

export interface UpdateBusinessProfileInput {
  businessName?: string;
  yearInBusiness?: string;
  companyRegNo?: string;
  businessRegType?: string;
  businessDescription?: string;
  contactInfo?: {
    primaryContactName?: string;
    emailAddress?: string;
    phoneNumber?: string;
    meansOfIdentification?: string;
    addressId?: string;
  };
}

export async function updateBusinessProfile(
  businessProfileId: string,
  data: UpdateBusinessProfileInput,
  vendorId?: string
): Promise<ActionResult<any>> {
  try {
    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}/api/v1/business-profiles/${businessProfileId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        cache: "no-store",
      })
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Failed to update business profile" };
    }

    const body = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }

    const { revalidatePath } = await import("next/cache");
    revalidatePath("/vendors");
    if (vendorId) {
      revalidatePath(`/vendors/profile/${vendorId}`);
    }

    return { success: true, data: body.data };
  } catch (error) {
    return {
      success: false,
      error: "An unexpected network error occurred while updating business profile.",
    };
  }
}

export async function suspendVendor(
  vendorId: string,
  reason?: string
): Promise<ActionResult<VendorProfile>> {
  try {
    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}/api/v1/admin/vendors/${vendorId}/suspend`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }),
        cache: "no-store",
      })
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Failed to suspend vendor account" };
    }

    const body = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }


    const { revalidatePath } = await import("next/cache");
    revalidatePath("/vendors");
    revalidatePath(`/vendors/profile/${vendorId}`);

    return { success: true, data: body.data };
  } catch (error) {
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function banVendor(
  vendorId: string,
  reason?: string
): Promise<ActionResult<VendorProfile>> {
  try {
    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}/api/v1/admin/vendors/${vendorId}/ban`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }),
        cache: "no-store",
      })
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Failed to ban vendor account" };
    }

    const body = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }


    const { revalidatePath } = await import("next/cache");
    revalidatePath("/vendors");
    revalidatePath(`/vendors/profile/${vendorId}`);

    return { success: true, data: body.data };
  } catch (error) {
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

export async function reactivateVendor(
  vendorId: string,
  reason?: string
): Promise<ActionResult<VendorProfile>> {
  try {
    const { response, error } = await fetchWithAuthRetry((token) =>
      fetch(`${process.env.BACKEND_URL}/api/v1/admin/vendors/${vendorId}/reactivate`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }),
        cache: "no-store",
      })
    );

    if (error && !response.ok) {
      return { success: false, error: error || "Failed to reactivate vendor account" };
    }

    const body = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: body.message || `Error: ${response.statusText}`,
      };
    }


    const { revalidatePath } = await import("next/cache");
    revalidatePath("/vendors");
    revalidatePath(`/vendors/profile/${vendorId}`);

    return { success: true, data: body.data };
  } catch (error) {
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}

