'use server';

import { redirect } from 'next/navigation';
import { setAuthCookies, clearAuthCookies, getRefreshToken, refreshAccessToken, getAccessToken } from '@/lib/session';
import type { LoginResponse } from '@/types/auth';

export interface LoginInput {
  email: string;
  password: string;
  remember?: boolean;
}

export interface ActionResult {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Login action - authenticate user with credentials
 */
export async function login(input: LoginInput): Promise<ActionResult> {
  try {
    if (!process.env.BACKEND_URL) {
      return { success: false, error: 'Backend not configured' };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: input.email,
        password: input.password,
      }),
      cache: 'no-store',
    });

    const data = await response.json().catch(() => null) as LoginResponse | null;

    if (!response.ok) {
      if (response.status === 429) {
        return { success: false, error: 'Too many login attempts. Please wait a moment and try again.' };
      }
      if (response.status === 401) {
        return { success: false, error: 'Invalid email or password. Please check your credentials.' };
      }
      const message = (data as { message?: string } | null)?.message;
      return { success: false, error: message || `Failed to login (${response.status})` };
    }

    // Store tokens in HTTP-only cookies
    const token = data?.data?.token;
    const refreshToken = data?.data?.refreshToken;

    if (token && refreshToken) {
      await setAuthCookies(token, refreshToken, input.remember ?? false);
    }

    return { success: true, data };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, error: message };
  }
}

/**
 * Logout - clears auth cookies and redirects to login page
 */
export async function logout(redirectTo: string = '/auth/login'): Promise<void> {
  await clearAuthCookies();
  redirect(redirectTo);
}

/**
 * Try to refresh the access token using the stored refresh token
 */
export async function tryRefreshToken() {
  const refreshTokenValue = await getRefreshToken();

  if (!refreshTokenValue) {
    return { success: false, error: 'No refresh token available' };
  }

  return refreshAccessToken(refreshTokenValue);
}

export interface ChangePasswordInput {
  currentPassword?: string;
  newPassword?: string;
}

/**
 * Change the password for the logged-in user
 */
export async function changePassword(input: ChangePasswordInput): Promise<ActionResult> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: 'Unauthorized: No access token' };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
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
    console.error("Change Password Error:", error);
    return {
      success: false,
      error: "An unexpected network error occurred.",
    };
  }
}
