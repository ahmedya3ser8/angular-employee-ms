import { IEmployee } from "../../employees/models/employee";

export interface IPayslip {
  _id: string;
  month: number;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  employee: IEmployee;
}

export interface IPayslipFormData {
  month: number;
  year: number;
  basicSalary: number;
  allowances: number;
  deductions: number;
  employee: string;
}

export interface IPayslipsResponse {
  success: boolean;
  message: string;
  data: IPayslip[];
}

export interface IPayslipResponse {
  success: boolean;
  message: string;
  data: IPayslip;
}
