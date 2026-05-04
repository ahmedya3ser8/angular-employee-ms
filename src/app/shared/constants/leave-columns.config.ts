import { IColumn } from "../../core/models/table";

type Role = 'admin' | 'employee';

export const LEAVE_COLUMNS: Record<Role, IColumn[]> = {
  admin: [
    { field: 'employee', header: 'Employee', isEmployee: true },
    { field: 'type', header: 'Type', isType: true },
    { field: 'dates', header: 'Dates', isDates: true },
    { field: 'reason', header: 'Reason' },
    { field: 'status', header: 'Status', isStatus: true },
  ],

  employee: [
    { field: 'type', header: 'Type', isType: true },
    { field: 'dates', header: 'Dates', isDates: true },
    { field: 'reason', header: 'Reason' },
    { field: 'status', header: 'Status', isStatus: true },
  ]
} as const;
