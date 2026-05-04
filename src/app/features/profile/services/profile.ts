import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IProfileFormData, IProfileResponse } from '../models/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly http = inject(HttpClient);

  getProfile(): Observable<IProfileResponse> {
    return this.http.get<IProfileResponse>(`${environment.baseURL}/profile`, {
      withCredentials: true
    })
  }

  updateProfile(formData: IProfileFormData): Observable<IProfileResponse> {
    return this.http.patch<IProfileResponse>(`${environment.baseURL}/profile`, formData, {
      withCredentials: true
    })
  }
}
