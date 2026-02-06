import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const registerSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z.string().trim().email('Please provide a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      'Password must contain at least one letter and one number'
    ),
});

export const validate = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      try {
        schema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof z.ZodError) {
          res.status(400).json({
            errors: error.issues.map((err) => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          });
          return;
        }
        res.status(400).json({ error: 'Validation failed' });
      }
    };
  };