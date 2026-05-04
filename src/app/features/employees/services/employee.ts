import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  ICreateEmployeeFormData,
  IEmployeeResponse,
  IEmployeesResponse,
  IUpdateEmployeeFormData
} from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly http = inject(HttpClient);

  getEmployees(employeeName?: string, department?: string): Observable<IEmployeesResponse> {
    let params = new HttpParams();
    if (employeeName) {
      params = params.set('search', employeeName);
    }
    if (department) {
      params = params.set('department', department);
    }
    return this.http.get<IEmployeesResponse>(`${environment.baseURL}/employees`, {
      withCredentials: true,
      params
    })
  }

  getEmployee(employeeId: string): Observable<IEmployeeResponse> {
    return this.http.get<IEmployeeResponse>(`${environment.baseURL}/employees/${employeeId}`, {
      withCredentials: true
    })
  }

  createEmployee(formData: ICreateEmployeeFormData): Observable<IEmployeeResponse> {
    return this.http.post<IEmployeeResponse>(`${environment.baseURL}/employees`, formData, {
      withCredentials: true
    })
  }

  updateEmployee(formData: IUpdateEmployeeFormData, employeeId: string): Observable<IEmployeeResponse> {
    return this.http.patch<IEmployeeResponse>(`${environment.baseURL}/employees/${employeeId}`, formData, {
      withCredentials: true
    })
  }

  deleteEmployee(employeeId: string): Observable<IEmployeeResponse> {
    return this.http.delete<IEmployeeResponse>(`${environment.baseURL}/employees/${employeeId}`, {
      withCredentials: true
    })
  }
}
