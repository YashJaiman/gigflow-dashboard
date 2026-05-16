import { User } from '../models/User.js';
import { IUser } from '../types/index.js';
import { ApiError } from '../middleware/errorHandler.js';

export class AuthService {
  static async register(
    name: string,
    email: string,
    password: string,
    role: 'admin' | 'sales' = 'sales'
  ): Promise<IUser> {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, 'User with this email already exists');
    }

    const user = new User({
      name,
      email,
      password,
      role,
    });

    await user.save();
    return user.toObject() as IUser;
  }

  static async login(email: string, password: string): Promise<IUser> {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid email or password');
    }

    return user.toObject() as IUser;
  }

  static async getUserById(userId: string): Promise<IUser | null> {
    const user = await User.findById(userId);
    return user ? (user.toObject() as IUser) : null;
  }
}
