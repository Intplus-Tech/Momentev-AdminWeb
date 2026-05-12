'use server';

import { getAccessToken, refreshAccessToken, getRefreshToken } from '@/lib/session';

export interface AuthRetryOptions {
  token?: string;
}

export interface AuthRetryResult<T> {
  response: Response;
  error?: string;
  token?: string;
  data?: T;
}

/**
 * Wraps a fetch request with automatic retry logic for 401 responses.
 * If a request returns 401, attempts to refresh the access token and retry once.
 * Returns the final response along with the token used.
 *
 * @param requestFn Function that creates and executes the fetch request
 * @param options Optional token and other retry options
 * @returns Object containing final response, any error, and the token used
 */
export async function fetchWithAuthRetry<T = any>(
  requestFn: (token: string) => Promise<Response>,
  options: AuthRetryOptions = {}
): Promise<AuthRetryResult<T>> {
  try {
    // Get or use provided token
    let token = options.token || (await getAccessToken());

    if (!token) {
      return {
        response: new Response(JSON.stringify({ error: 'No access token available' }), {
          status: 401,
          statusText: 'Unauthorized',
        }),
        error: 'No access token available',
      };
    }

    // Make the initial request
    let response = await requestFn(token);

    // If 401, try to refresh and retry once
    if (response.status === 401) {
      const refreshToken = await getRefreshToken();

      if (refreshToken) {
        const refreshResult = await refreshAccessToken(refreshToken);

        if (refreshResult.success && refreshResult.token) {
          // Retry with new token
          token = refreshResult.token;
          response = await requestFn(token);
        }
      }
    }

    return {
      response,
      token,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      response: new Response(JSON.stringify({ error: errorMessage }), {
        status: 500,
        statusText: 'Internal Server Error',
      }),
      error: errorMessage,
    };
  }
}
