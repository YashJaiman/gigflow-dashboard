import { Router } from 'express';
import { register, login, me } from '../controllers/authController.js';
import {
  registerValidation,
  loginValidation,
  validateRequest,
} from '../validators/index.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/register', registerValidation(), validateRequest, register);
router.post('/login', loginValidation(), validateRequest, login);
router.get('/me', authenticate, me);

export default router;
