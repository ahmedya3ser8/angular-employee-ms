export interface IAttendance {
  _id: string;
  date: Date;
  checkIn: Date;
  checkOut: Date;
  workingHours: number;
  status: string;
  dayType: string;
  employee: string;
}

export interface IAttendanceStats {
  daysPresent: number;
  lateArrivals: number;
  avgWorkHours: number;
}

export interface IAttendancesResponse {
  success: boolean;
  message: string;
  data: IAttendance[];
}

export interface IAttendanceResponse {
  success: boolean;
  message: string;
  data: IAttendance;
}

export interface IAttendanceStatsResponse {
  success: boolean;
  data: IAttendanceStats;
}
