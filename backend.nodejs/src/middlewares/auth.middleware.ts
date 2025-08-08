import { UserRepository } from "@/models/user.model";
import { AuthRequest } from "@/types/auth.types";
import { JwtUtil } from "@/utils/jwt.util";
import { ResponseUtil } from "@/utils/response.util";
import { Response, NextFunction } from "express";
import { request } from "http";

export const authenticate = async (
      request: AuthRequest, response: Response, next: NextFunction
): Promise<void> => {
      try {
            const authHeader = request.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                  ResponseUtil.error(response, 'Access token required', 401);
                  return;
            }

            const token = authHeader.substring(7);
            const decoded = await JwtUtil.verify(token);

            const user = await UserRepository.findById(decoded.id);
            if (!user || !user.isEnable) {
                  ResponseUtil.error(response, 'User not found or inactive', 401);
                  return;
            }

            // Access token is valid
            request.user = {
                  id: user.id.toString(),
                  email: user.email,
                  role: user.role,
            };    
            next();
      }
      catch(error) {
            console.error('Authentication error:', error);
            ResponseUtil.error(response, 'Invalid or expired token', 401);
      }
}


export const authorize = (roles: string) => {
      return (request: AuthRequest, response: Response, next: NextFunction): void => {
            // Check if user is authenticated
            if (!request.user) {
                  ResponseUtil.error(response, 'Authentication required', 401);
                  return;     
            }
            // Check if user has the required role
            if (!roles.includes(request.user.role)) {
                  ResponseUtil.error(response, 'Forbidden', 403);
                  return;
            }
            next();
      }
}