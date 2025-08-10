import { UserProfileResponse } from "@/types/auth.types";
import { IUser } from "@/types/user.types";

export async function mapUserToUserProfileResponse(user: IUser): Promise<UserProfileResponse> {
  return {
    fullname: user.fullname,
    email: user.email,
    password: user.password,
    role: user.role,
    isEnable: user.isEnable,
    createdDate: user.createdDate,
    updatedDate: user.updatedDate,
  };
}