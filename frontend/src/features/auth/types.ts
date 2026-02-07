import type { User } from '@/types/user';

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  message: string;
  user: User;
};

export type ApiError = {
  errors: Array<{
    field: string | null;
    message: string;
  }>;
};
