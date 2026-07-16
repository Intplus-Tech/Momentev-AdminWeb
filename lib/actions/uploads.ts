"use server";

import { getAccessToken } from "@/lib/session";

interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface UploadedFile {
  _id: string;
  url: string;
  originalName: string;
  mimeType: string;
  size: number;
  provider: string;
}

/**
 * Upload a file (image or document) to the backend's Cloudinary storage.
 * Accepts a FormData object with a "file" field and an optional "folder" field.
 */
export async function uploadFile(
  formData: FormData
): Promise<ActionResult<UploadedFile>> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "Unauthorized: No access token" };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/uploads`, {
      method: "POST",
      headers: {
        // Do NOT set Content-Type here — the browser sets it with the correct
        // multipart boundary when it detects a FormData body.
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
    return { success: false, error: "An unexpected network error occurred." };
  }
}
