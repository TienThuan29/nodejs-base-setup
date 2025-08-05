import jwt from 'jsonwebtoken';
import { config } from '../configs/config';
import { JWTPayload } from '../types/auth.types';

export class JWTUtil {
  static generateAccessToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
    });
  }

  static generateRefreshToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
      expiresIn: config.JWT_REFRESH_EXPIRES_IN,
    });
  }

  static verifyAccessToken(token: string): JWTPayload {
    return jwt.verify(token, config.JWT_SECRET) as JWTPayload;
  }

  static verifyRefreshToken(token: string): JWTPayload {
    return jwt.verify(token, config.JWT_REFRESH_SECRET) as JWTPayload;
  }

  static generateTokenPair(payload: Omit<JWTPayload, 'iat' | 'exp'>) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }
}