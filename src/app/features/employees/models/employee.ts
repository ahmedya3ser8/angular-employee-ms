import { Role } from "../../../core/models/types";
import { IUser } from "../../auth/models/auth";

export interface IEmployee {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  bio: string;
  department: string;
  position: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  isActive: boolean;
  user: IUser;
}

export interface IEmployeesResponse {
  success: boolean;
  message: string;
  data: IEmployee[];
}

export interface IEmployeeResponse {
  success: boolean;
  message: string;
  data: IEmployee;
}

export interface ICreateEmployeeFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  bio?: string;
  department: string;
  position: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  email: string;
  password: string;
  role: Role;
}

export interface IUpdateEmployeeFormData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  bio?: string;
  department?: string;
  position?: string;
  basicSalary?: number;
  allowances?: number;
  deductions?: number;
  user: {
    email?: string;
    password?: string;
    role?: Role;
  }
}
