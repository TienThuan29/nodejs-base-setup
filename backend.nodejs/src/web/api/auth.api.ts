
import { AuthService } from '@/services/auth.service';
import { AuthRequest, RegisterData } from '@/types/auth.types';
import { ResponseUtil } from '@/utils/response.util';
import { Request, Response, NextFunction } from 'express';

export class AuthController {

      private authService: AuthService = new AuthService();

      constructor() {
            this.authenticate = this.authenticate.bind(this);
            this.refreshToken = this.refreshToken.bind(this);
            this.getProfile = this.getProfile.bind(this);
            this.register = this.register.bind(this);
      }


      async authenticate(request: Request, response: Response, next: NextFunction): Promise<void> {
            try {
                  const credentials = request.body;
                  const authResponse = await this.authService.authenticate(credentials);
                  ResponseUtil.success(response, authResponse, 'Login successful');
            }
            catch (error) {
                  if (error instanceof Error) {
                        ResponseUtil.error(response, error.message, 400);
                  } else {
                        next(error);
                  }
            }
      }


      async refreshToken(request: Request, response: Response, next: NextFunction): Promise<void> {
            try {
                  const { refreshToken } = request.body;
                  if (!refreshToken) {
                        ResponseUtil.error(response, 'Refresh token required', 400);
                        return;
                  }
                  const newAccessToken = await this.authService.refreshToken(refreshToken);
                  ResponseUtil.success(response, newAccessToken, 'Token refreshed successfully');
            }
            catch (error) {
                  if (error instanceof Error) {
                        ResponseUtil.error(response, error.message, 400);
                  } else {
                        next(error);
                  }
            }
      }


      async getProfile(request: AuthRequest, response: Response, next: NextFunction): Promise<void> {
            if (!request.user || !request.user.id) {
                  ResponseUtil.error(response, 'User not authenticated', 401);
                  return;
            }
            ResponseUtil.success(response, await this.authService.getProfile(request.user.id), 'Profile retrieved successfully'); // can use request.user to get user ID, email
      }
      

      async register(request: Request, response: Response, next: NextFunction): Promise<void> {
            try {
                  const registerData: RegisterData = request.body;
                  const registerResponse = await this.authService.register(registerData);
                  ResponseUtil.success(response, registerResponse, 'User registered successfully', 201);
            }
            catch (error) {
                  if (error instanceof Error) {
                        ResponseUtil.error(response, error.message, 400);
                  } else {
                        next(error);
                  }
            }
      }

}


