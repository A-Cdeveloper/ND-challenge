import { z } from 'zod';

// Shared schemas
export const emailSchema = z
  .string()
  .trim()
  .refine(
    (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    { message: 'Please provide a valid email address' }
  );

export const passwordSchema = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters long' });

// Register schema
export const registerSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: emailSchema,
  password: passwordSchema,
});

// Login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
