import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import mongoose from 'mongoose';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log error
  console.error('Error:', {
    message: err.message,
    path: req.path,
    method: req.method,
  });

  // 1. Express JSON parse errors
  // Catches: When invalid JSON is sent in request body
  // Example: User sends malformed JSON -> SyntaxError
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({
      errors: [
        {
          field: null,
          message: 'Invalid JSON format',
        },
      ],
    });
    return;
  }

  // 2. Zod validation errors
  // Catches: When Zod schema validation fails (e.g., invalid email format, password too short)
  // Example: User sends { email: "invalid", password: "123" } -> ZodError
  if (err instanceof ZodError) {
    res.status(400).json({
      errors: err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
    return;
  }

  // 3. MongoDB duplicate key error
  // Catches: When trying to create document with duplicate unique field (e.g., email already exists)
  // Example: User tries to register with email that already exists in database
  // Error code 11000 = duplicate key error
  if (err.name === 'MongoServerError' && err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    res.status(400).json({
      errors: [
        {
          field: field,
          message: `User with this ${field} already exists`,
        },
      ],
    });
    return;
  }

  // 4. Mongoose validation error
  // Catches: When Mongoose schema validation fails (e.g., required field missing, invalid format)
  // Example: User model has required field but it's not provided
  if (err.name === 'ValidationError') {
    res.status(400).json({
      errors: Object.values(err.errors).map((e: any) => ({
        field: e.path,
        message: e.message,
      })),
    });
    return;
  }

  // 5. Mongoose CastError
  // Catches: When invalid ID format is provided (e.g., "invalid-id" instead of MongoDB ObjectId)
  // Example: User.findById("not-a-valid-id") -> CastError
  if (err.name === 'CastError') {
    res.status(400).json({
      errors: [
        {
          field: err.path || 'id',
          message: 'Invalid ID format',
        },
      ],
    });
    return;
  }

  // 6. MongoDB connection error
  // Catches: When MongoDB connection fails or times out
  // Example: MongoDB server is down, network issues, connection timeout
  if (err.name === 'MongoNetworkError' || err.name === 'MongoTimeoutError') {
    res.status(500).json({
      errors: [
        {
          field: null,
          message: 'Database connection error',
        },
      ],
    });
    return;
  }

  // 7. Custom error with statusCode
  // Catches: Errors passed from controllers with statusCode property
  // Example: next({ message: 'User not found', statusCode: 401, field: 'email' })
  if (err.statusCode) {
    res.status(err.statusCode).json({
      errors: [
        {
          field: err.field || null,
          message: err.message,
        },
      ],
    });
    return;
  }

  // 8. Default - unknown error
  // Catches: Any other unhandled error (programming errors, unexpected errors)
  // Example: undefined variable, null reference, etc.
  res.status(500).json({
    errors: [
      {
        field: null,
        message: 'Internal server error',
      },
    ],
  });
};
