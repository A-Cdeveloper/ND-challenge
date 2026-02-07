import { env } from './env';
import type { ApiError } from '@/features/auth/types';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  credentials?: 'omit' | 'same-origin' | 'include';
};

type ApiResponse<T> = {
  data: T;
  error: null;
} | {
  data: null;
  error: ApiError;
};

/**
 * Generic API wrapper for HTTP requests.
 * Handles JSON serialization, session cookies, and error formatting.
 * 
 * @template T - Response data type
 * @param {string} endpoint - API endpoint path
 * @param {RequestOptions} [options] - Request options
 * @returns {Promise<ApiResponse<T>>} Response with data or error
 */
export async function api<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    headers = {},
    body,
    credentials = 'include', // Required for session cookies
  } = options;

  try {
    const url = `${env.API_URL}${endpoint}`;

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      credentials,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      // Backend always returns errors in format: { errors: [{ field, message }] }
      return {
        data: null,
        error: data as ApiError,
      };
    }

    // Success response - format varies by endpoint
    return {
      data: data as T,
      error: null,
    };
  } catch (error) {
    // Network errors, JSON parse errors, etc.
    return {
      data: null,
      error: {
        errors: [
          {
            field: null,
            message:
              error instanceof Error
                ? error.message
                : 'Network error. Please check your connection.',
          },
        ],
      },
    };
  }
}
