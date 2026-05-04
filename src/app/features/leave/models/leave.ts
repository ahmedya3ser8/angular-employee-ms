import { ActionStatus } from "../../../core/models/types";
import { IEmployee } from "../../employees/models/employee";

export interface ILeave {
  _id: string;
  type: 'casual' | 'annual' | 'sick';
  startDate: Date;
  endDate: Date;
  reason: string;
  status: ActionStatus;
  employee: IEmployee;
}

export interface ILeaveStats {
  sick: number;
  casual: number;
  annual: number;
}

export interface ILeavesResponse {
  success: boolean;
  message: string;
  data: ILeave[];
}

export interface ILeaveResponse {
  success: boolean;
  message: string;
  data: ILeave;
}

export interface LeaveStatsResponse {
  success: boolean;
  message: string;
  data: ILeaveStats;
}

export interface ICreateLeaveFormData {
  type: 'casual' | 'annual' | 'sick';
  startDate: Date;
  endDate: Date;
  reason: string;
}

export interface IUpdateLeaveFormData {
  status: ActionStatus;
}
