import express from 'express';
import { register } from '../controllers/authController';
import { registerSchema, validate } from '../middleware/validation';

const router = express.Router();

// POST /api/auth/register
router.post('/register', validate(registerSchema), register);

export default router;