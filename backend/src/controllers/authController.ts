import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { hashPassword, comparePassword } from '../utils/password';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next({
        message: 'User with this email already exists',
        statusCode: 400,
        field: 'email',
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Create session
    req.session.userId = user._id.toString();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next({
        message: 'User with this email does not exist',
        statusCode: 401,
        field: 'email',
      });
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return next({
        message: 'Wrong password for this email',
        statusCode: 401,
        field: 'password',
      });
    }

    // Create session
    req.session.userId = user._id.toString();

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const verify = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // User is already authenticated and attached to req by requireAuth middleware
    const user = req.user;

    if (!user) {
      return next({
        message: 'User not found',
        statusCode: 401,
      });
    }

    res.status(200).json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return next({
          message: 'Failed to destroy session',
          statusCode: 500,
        });
      }

      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logout successful' });
    });
  } catch (error) {
    next(error);
  }
};