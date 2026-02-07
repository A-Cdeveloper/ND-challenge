import { api } from '@/lib/api';
import type { LoginRequest, AuthResponse } from '../types';

/**
 * Authenticates user with email and password.
 * Creates session cookie on successful login.
 * 
 * @param credentials - User login credentials
 * @returns Response with user data or error
 */
export async function login(credentials: LoginRequest) {
  return api<AuthResponse>('/api/auth/login', {
    method: 'POST',
    body: credentials,
  });
}
