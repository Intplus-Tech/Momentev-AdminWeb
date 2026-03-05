"use server";

import { getAccessToken } from "@/lib/session";
import { AdminUser } from "@/lib/actions/admins";

interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ProfileUser extends AdminUser {
  phoneNumber: string | null;
  dateOfBirth: string | null;
  addressId: string | null;
  googleId: string | null;
  avatar: string | null;
  stripeCustomerId: string | null;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
}

export async function getMyProfile(): Promise<ActionResult<ProfileUser>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/users/profile`, {
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
    console.error("Get Profile Error:", error);
    return { success: false, error: "An unexpected network error occurred." };
  }
}

export async function updateMyProfile(data: UpdateProfileData): Promise<ActionResult<ProfileUser>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/users/profile/update`, {
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

    const { revalidatePath } = await import("next/cache");
    revalidatePath("/profile");

    return { success: true, data: body.data };
  } catch (error) {
    console.error("Update Profile Error:", error);
    return { success: false, error: "An unexpected network error occurred." };
  }
}
