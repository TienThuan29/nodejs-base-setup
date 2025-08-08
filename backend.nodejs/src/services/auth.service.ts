import { UserRepository } from "@/models/user.model";
import {
      AuthResponse,
      LoginCredentials,
      RegisterData,
} from "@/types/auth.types";
import { JwtUtil } from "@/utils/jwt.util";

export class AuthService {

      public async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
            const decoded = await JwtUtil.verify(refreshToken);

            const user = await UserRepository.findById(decoded.id);
            if (!user || !user.isEnable) {
                  throw new Error('User not found or inactive');
            }

            const tokenPayload = {
                  id: user.id.toString(),
                  email: user.email,
                  role: user.role,
            };
            const accessToken = await JwtUtil.generateAccessToken(tokenPayload);

            return { accessToken: accessToken };
      }


      public async authenticate(credentials: LoginCredentials): Promise<AuthResponse> {
            const user = await UserRepository.findOne({
                  email: credentials.email,
            }).select("+password");

            if (!user || !user.isEnable) {
                  throw new Error("Invalid email or password");
            }
            const isPasswordValid = await user.comparePassword(credentials.password);
            if (!isPasswordValid) {
                  throw new Error("Invalid email or password");
            }
            const tokenPayload = {
                  id: user.id.toString(),
                  email: user.email,
                  role: user.role,
            };
            const accessToken = await JwtUtil.generateAccessToken(tokenPayload);
            const refreshToken = await JwtUtil.generateRefreshToken(tokenPayload);
            const authResponse: AuthResponse = {
                  user: {
                        id: user.id.toString(),
                        fullname: user.fullname,
                        email: user.email,
                        role: user.role,
                  },
                  accessToken,
                  refreshToken,
            };

            return authResponse;
      }


      public async register(registerData: RegisterData): Promise<AuthResponse> {
            const existingUser = await UserRepository.findOne({
                  email: registerData.email,
            });
            if (existingUser) {
                  throw new Error("Email already exists");
            }

            const user = await UserRepository.create(registerData);
            const tokenPayload = {
                  id: user.id.toString(),
                  email: user.email,
                  role: user.role,

            };

            const accessToken = await JwtUtil.generateAccessToken(tokenPayload);
            const refreshToken = await JwtUtil.generateRefreshToken(tokenPayload);
            const authResponse: AuthResponse = {
                  user: {
                        id: user.id.toString(),
                        fullname: user.fullname,
                        email: user.email,
                        role: user.role,
                  },
                  accessToken,
                  refreshToken,
            };

            return authResponse;
      }
}
