import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

/**
 * Authentication middleware
 * Verifies that the user is authenticated by checking the session
 * If authenticated, attaches user to request object
 * If not authenticated, returns 401 error
 */
export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return next({
        message: 'Not authenticated',
        statusCode: 401,
      });
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return next({
        message: 'User not found',
        statusCode: 401,
      });
    }

    // Attach user to request object for use in controllers
    req.user = {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};
