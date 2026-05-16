import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService.js';
import { generateToken } from '../utils/jwt.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { API_MESSAGES } from '../constants/index.js';

export const register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body;

  const user = await AuthService.register(name, email, password, role || 'sales');
  const token = generateToken({
    userId: user._id,
    email: user.email,
    role: user.role,
  });

  res.status(201).json({
    success: true,
    message: API_MESSAGES.REGISTRATION_SUCCESS,
    data: {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await AuthService.login(email, password);
  const token = generateToken({
    userId: user._id,
    email: user.email,
    role: user.role,
  });

  res.status(200).json({
    success: true,
    message: API_MESSAGES.LOGIN_SUCCESS,
    data: {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
});

export const me = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ success: false, message: API_MESSAGES.UNAUTHORIZED });
    return;
  }

  const user = await AuthService.getUserById(req.user.userId);
  if (!user) {
    res.status(404).json({ success: false, message: API_MESSAGES.USER_NOT_FOUND });
    return;
  }

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
