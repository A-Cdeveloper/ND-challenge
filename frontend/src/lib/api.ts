import { env } from './env';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  credentials?: 'omit' | 'same-origin' | 'include';
};

/**
 * Generic API wrapper for HTTP requests.
 * Handles JSON serialization, session cookies, and error formatting.
 * 
 * @template T - Response data type
 * @param {string} endpoint - API endpoint path
 * @param {RequestOptions} [options] - Request options
 * @returns {Promise<T>} Response data or throws error
 */
export async function api<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
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
      const errorMessage = data.errors?.[0]?.message || 'Request failed';
      throw new Error(errorMessage);
    }

    // Success response - return data directly
    return data as T;
  } catch (error) {
    // Re-throw if already an Error
    if (error instanceof Error) {
      throw error;
    }
    // Network errors, JSON parse errors, etc.
    throw new Error('Network error. Please check your connection.');
  }
}
