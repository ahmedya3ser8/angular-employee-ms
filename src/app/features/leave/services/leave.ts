import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ICreateLeaveFormData, ILeaveResponse, ILeavesResponse, LeaveStatsResponse, IUpdateLeaveFormData } from '../models/leave';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private readonly http = inject(HttpClient);

  getLeaves(): Observable<ILeavesResponse> {
    return this.http.get<ILeavesResponse>(`${environment.baseURL}/leaves`, {
      withCredentials: true
    })
  }

  getMyLeaves(): Observable<ILeavesResponse> {
    return this.http.get<ILeavesResponse>(`${environment.baseURL}/leaves/me`, {
      withCredentials: true
    })
  }

  getLeaveStats(): Observable<LeaveStatsResponse> {
    return this.http.get<LeaveStatsResponse>(`${environment.baseURL}/leaves/stats`, {
      withCredentials: true
    })
  }

  createLeave(formData: ICreateLeaveFormData): Observable<ILeaveResponse> {
    return this.http.post<ILeaveResponse>(`${environment.baseURL}/leaves`, formData, {
      withCredentials: true
    })
  }

  updateLeave(formData: IUpdateLeaveFormData, leaveId: string): Observable<ILeaveResponse> {
    return this.http.patch<ILeaveResponse>(`${environment.baseURL}/leaves/${leaveId}`, formData, {
      withCredentials: true
    })
  }
}
