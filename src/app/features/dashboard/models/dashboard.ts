export interface IAdminStats {
  pendingLeaves: number;
  todaysAttendance: number;
  totalDepartment: number;
  totalEmployees: number;
}

export interface IAdminDashboardResponse {
  status: boolean;
  data: IAdminStats;
}

export interface IEmployeeStats {
  daysPresent: number;
  pendingLeaves: number;
  latestPayslip: number;
}

export interface IEmployeeDashboardResponse {
  status: boolean;
  data: IEmployeeStats;
}
