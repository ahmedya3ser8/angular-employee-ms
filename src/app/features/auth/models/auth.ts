import { IEmployee } from "../../employees/models/employee";

export interface IAuthResponse {
  success: boolean;
  message: string;
  data: IEmployee;
}

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  email: string;
  role: 'admin' | 'employee';
  isActive: boolean;
};

export interface IPasswordFormData {
  currentPassword: string;
  newPassword: string;
}
