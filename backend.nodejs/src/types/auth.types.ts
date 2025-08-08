import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

// Extend Resquest class to replace the default Request type
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullname: string;
  email: string;
  password: string;
}

export interface JWTPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: {
    id: string;
    fullname: string;
    email: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}