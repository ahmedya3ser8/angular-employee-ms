import { IColumn } from "../../core/models/table";

type Role = 'admin' | 'employee';

export const PAYSLIP_COLUMNS: Record<Role, IColumn[]> = {
  admin: [
    { field: 'employee', header: 'Employee', isEmployee: true },
    { field: 'period', header: 'Period', isPeriod: true },
    { field: 'basicSalary', header: 'Basic Salary' },
    { field: 'netSalary', header: 'Net Salary' },
  ],

  employee: [
    { field: 'period', header: 'Period', isPeriod: true },
    { field: 'basicSalary', header: 'Basic Salary' },
    { field: 'netSalary', header: 'Net Salary' },
  ]
} as const;
