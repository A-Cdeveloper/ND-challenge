import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

// Helper function to format rate limit error response
const formatRateLimitError = (message: string) => {
  return {
    errors: [
      {
        field: null,
        message: message,
      },
    ],
  };
};



// Strict rate limiter for authentication routes (login, register)
// Limits: 5 requests per 15 minutes per IP
// This prevents brute force attacks
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  // Skip successful requests (don't count successful logins/registrations)
  skipSuccessfulRequests: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json(
      formatRateLimitError('Too many authentication attempts, please try again later.')
    );
  },
});
