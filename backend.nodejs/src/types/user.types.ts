import { Document } from 'mongoose';

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  role: 'CUSTOMER' | 'DEV' | 'STAFF' | 'ADMIN';
  isEnable: boolean;
  createdDate: Date;
  updatedDate: Date;
  comparePassword(password: string): Promise<boolean>;
}