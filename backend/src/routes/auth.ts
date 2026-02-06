import express from 'express';
import { register, login, verify, logout } from '../controllers/authController';
import { registerSchema, loginSchema } from '../schemas/authSchemas';
import { validate } from '../middleware/validate';

const router = express.Router();

// POST /api/auth/register
router.post('/register', validate(registerSchema), register);

// POST /api/auth/login
router.post('/login', validate(loginSchema), login);

// GET /api/auth/verify
router.get('/verify', verify);

// POST /api/auth/logout
router.post('/logout', logout);

export default router;