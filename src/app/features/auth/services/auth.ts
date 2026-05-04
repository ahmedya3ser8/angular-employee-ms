import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { IAuthResponse, ILoginFormData, IPasswordFormData } from '../models/auth';
import { Role } from '../../../core/models/types';
import { IEmployee } from '../../employees/models/employee';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  role: WritableSignal<Role> = signal(null);
  employee: WritableSignal<IEmployee | null> = signal(null);

  login(formData: ILoginFormData): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${environment.baseURL}/auth/login`, formData, {
      withCredentials: true
    });
  }

  checkAuth(): Observable<IAuthResponse> {
    return this.http.get<IAuthResponse>(`${environment.baseURL}/auth/getMe`, {
      withCredentials: true
    }).pipe(
      tap((res) => {
        this.employee.set(res.data);
        this.role.set(res.data.user.role);
      })
    )
  }

  logout(): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${environment.baseURL}/auth/logout`, {}, {
      withCredentials: true
    });
  }

  changePassword(formData: IPasswordFormData): Observable<IAuthResponse> {
    return this.http.patch<IAuthResponse>(`${environment.baseURL}/auth/changePassword`, formData, {
      withCredentials: true
    });
  }

  isAuthenticated(): boolean {
    return this.employee() !== null;
  }
}
