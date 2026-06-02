'use server';

import { cookies } from 'next/headers';

const AUTH_TOKEN_KEY = 'moementev-admin-auth-token';
const REFRESH_TOKEN_KEY = 'moementev-admin-refresh-token';

// Token expiry defaults (in seconds)
const ACCESS_TOKEN_MAX_AGE = 60 * 60; // 1 hour
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const REMEMBER_ME_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export interface AuthTokens {
  token: string;
  refreshToken: string;
}

export interface RefreshResponse {
  message: string;
  data: {
    token: string;
  };
}

/**
 * Store auth tokens in HTTP-only cookies
 */
export async function setAuthCookies(
  token: string,
  refreshToken: string,
  remember: boolean = false
): Promise<void> {
  const cookieStore = await cookies();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };

  // Access token - shorter lived
  cookieStore.set(AUTH_TOKEN_KEY, token, {
    ...cookieOptions,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  // Refresh token - longer lived, extended if "remember me" is checked
  cookieStore.set(REFRESH_TOKEN_KEY, refreshToken, {
    ...cookieOptions,
    maxAge: remember ? REMEMBER_ME_MAX_AGE : REFRESH_TOKEN_MAX_AGE,
  });
}

/**
 * Retrieve auth tokens from cookies
 */
export async function getAuthCookies(): Promise<AuthTokens | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get(AUTH_TOKEN_KEY)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;

  if (!token && !refreshToken) {
    return null;
  }

  return {
    token: token || '',
    refreshToken: refreshToken || '',
  };
}

/**
 * Get just the access token, or try to refresh it if missing
 */
export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(AUTH_TOKEN_KEY)?.value;

  // Return if access token exists
  if (accessToken) {
    return accessToken;
  }

  // Try to refresh using refresh token
  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;
  if (!refreshToken) {
    return null;
  }

  const result = await refreshAccessToken(refreshToken);
  if (result.success && result.token) {
    return result.token;
  }

  return null;
}

/**
 * Get just the refresh token
 */
export async function getRefreshToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_KEY)?.value || null;
}

/**
 * Clear auth cookies (logout)
 */
export async function clearAuthCookies(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(AUTH_TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);
}

/**
 * Refresh the access token using the refresh token
 */
export async function refreshAccessToken(refreshToken: string): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    if (!process.env.BACKEND_URL) {
      return { success: false, error: 'Backend not configured' };
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
      cache: 'no-store',
    });

    const data = await response.json().catch(() => null) as RefreshResponse | null;

    if (!response.ok) {
      return { success: false, error: 'Token refresh failed' };
    }

    const newToken = data?.data?.token;
    if (!newToken) {
      return { success: false, error: 'No token in response' };
    }

    // Update the access token cookie
    const cookieStore = await cookies();
    cookieStore.set(AUTH_TOKEN_KEY, newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    return { success: true, token: newToken };
  } catch {
    return { success: false, error: 'Token refresh failed' };
  }
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

/**
 * Decode the JWT payload and return the claims.
 * No external library needed — JWT payload is just base64url-encoded JSON.
 */
export interface TokenClaims {
  userId?: string;
  email?: string;
  role?: string;
  adminPermissions?: string[];
  rootAdmin?: boolean;
}

export async function getTokenClaims(): Promise<TokenClaims | null> {
  try {
    const token = await getAccessToken();
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Base64url -> Base64 -> JSON
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = Buffer.from(base64, 'base64').toString('utf8');
    return JSON.parse(json) as TokenClaims;
  } catch {
    return null;
  }
}
