import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IPayslipFormData, IPayslipResponse, IPayslipsResponse } from '../models/payslip';

@Injectable({
  providedIn: 'root',
})
export class PayslipService {
  private readonly http = inject(HttpClient);

  getPayslips(): Observable<IPayslipsResponse> {
    return this.http.get<IPayslipsResponse>(`${environment.baseURL}/payslips`, {
      withCredentials: true
    })
  }

  getPayslip(payslipId: string): Observable<IPayslipResponse> {
    return this.http.get<IPayslipResponse>(`${environment.baseURL}/payslips/${payslipId}`, {
      withCredentials: true
    })
  }

  getMyPayslips(): Observable<IPayslipsResponse> {
    return this.http.get<IPayslipsResponse>(`${environment.baseURL}/payslips/me`, {
      withCredentials: true
    })
  }

  createPayslip(formData: IPayslipFormData): Observable<IPayslipResponse> {
    return this.http.post<IPayslipResponse>(`${environment.baseURL}/payslips`, formData, {
      withCredentials: true
    })
  }
}
