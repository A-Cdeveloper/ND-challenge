import express from 'express';
import { register, login } from '../controllers/authController';
import { registerSchema, loginSchema, validate } from '../middleware/validation';

const router = express.Router();

// POST /api/auth/register
router.post('/register', validate(registerSchema), register);

// POST /api/auth/login
router.post('/login', validate(loginSchema), login);

export default router;