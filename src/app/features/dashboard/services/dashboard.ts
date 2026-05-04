import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IAdminDashboardResponse, IEmployeeDashboardResponse } from '../models/dashboard';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = inject(HttpClient);

  getAdminDashboard(): Observable<IAdminDashboardResponse> {
    return this.http.get<IAdminDashboardResponse>(`${environment.baseURL}/dashboard/admin`, {
      withCredentials: true
    });
  }

  getEmployeeDashboard(): Observable<IEmployeeDashboardResponse> {
    return this.http.get<IEmployeeDashboardResponse>(`${environment.baseURL}/dashboard/employee`, {
      withCredentials: true
    });
  }
}
