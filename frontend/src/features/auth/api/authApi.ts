import { api } from '@/lib/api';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types';
import type { User } from '@/types/user';

/**
 * Registers a new user account.
 * Creates user and session cookie on successful registration.
 * 
 * @param data - User registration data
 * @returns Response with user data or error
 */
export async function register(data: RegisterRequest) {
  return api<AuthResponse>('/api/auth/register', {
    method: 'POST',
    body: data,
  });
}

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

/**
 * Verifies current user session.
 * Returns user data if session is valid.
 * 
 * @returns User data or throws error
 */
export async function verify() {
  const result = await api<{ user: User }>('/api/auth/verify', {
    method: 'GET',
  });
  return result.user;
}

/**
 * Logs out the current user.
 * Destroys session and clears session cookie.
 * 
 * @returns Response with success message or error
 */
export async function logout() {
  return api<{ message: string }>('/api/auth/logout', {
    method: 'POST',
  });
}
