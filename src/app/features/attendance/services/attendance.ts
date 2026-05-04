import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IAttendanceResponse, IAttendancesResponse, IAttendanceStatsResponse } from '../models/attendance';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private readonly http = inject(HttpClient);

  getAttendances(): Observable<IAttendancesResponse> {
    return this.http.get<IAttendancesResponse>(`${environment.baseURL}/attendance`, {
      withCredentials: true
    })
  }

  getAttendanceStats(): Observable<IAttendanceStatsResponse> {
    return this.http.get<IAttendanceStatsResponse>(`${environment.baseURL}/attendance/stats`, {
      withCredentials: true
    })
  }

  createAttendance(): Observable<IAttendanceResponse> {
    return this.http.post<IAttendanceResponse>(`${environment.baseURL}/attendance`, {}, {
      withCredentials: true
    })
  }
}
