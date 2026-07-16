import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs"; // ensure full Node.js runtime (not Edge)

// Allow large multipart bodies — Next.js Route Handlers don't share the
// 1 MB Server Action body limit, but we set this explicitly for clarity.
export const dynamic = "force-dynamic";

/**
 * POST /api/uploads
 *
 * Proxies a multipart/form-data upload to the backend's Cloudinary endpoint.
 * Reads the access-token cookie server-side so it never has to leave the server.
 *
 * Expected body: FormData with:
 *   - file   (required) — the image/document binary
 *   - folder (optional) — Cloudinary folder name
 */
export async function POST(request: NextRequest) {
  try {
    // Read auth token from HTTP-only cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("moementev-admin-auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: No access token" },
        { status: 401 }
      );
    }

    if (!process.env.BACKEND_URL) {
      return NextResponse.json(
        { success: false, error: "Backend not configured" },
        { status: 500 }
      );
    }

    // Parse the incoming FormData and forward it as-is
    const formData = await request.formData();

    const backendResponse = await fetch(
      `${process.env.BACKEND_URL}/api/v1/uploads`,
      {
        method: "POST",
        headers: {
          // Do NOT set Content-Type — fetch sets it with the correct boundary
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const body = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: body.message || `Upload failed: ${backendResponse.statusText}`,
        },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json({ success: true, data: body.data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during upload." },
      { status: 500 }
    );
  }
}
