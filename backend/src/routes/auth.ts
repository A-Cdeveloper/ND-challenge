import express from 'express';
import { register, login, verify, logout } from '../controllers/authController';
import { registerSchema, loginSchema } from '../schemas/authSchemas';
import { validate } from '../middleware/validate';
import { authLimiter } from '../middleware/rateLimiter';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

// POST /api/auth/register
router.post('/register', authLimiter, validate(registerSchema), register);

// POST /api/auth/login
router.post('/login', authLimiter, validate(loginSchema), login);

// GET /api/auth/verify (protected route)
router.get('/verify', requireAuth, verify);

// POST /api/auth/logout
router.post('/logout', logout);

export default router;