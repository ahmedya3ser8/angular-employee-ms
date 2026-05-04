import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';

import { PageHeader } from "../../../../shared/components/page-header/page-header";
import { AuthService } from '../../../auth/services/auth';
import { DashboardActions } from "../../components/dashboard-actions/dashboard-actions";
import { DashboardStats } from "../../components/dashboard-stats/dashboard-stats";
import { IAdminStats, IEmployeeStats } from '../../models/dashboard';
import { DashboardService } from '../../services/dashboard';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '../../../../core/services/toast';

@Component({
  selector: 'app-dashboard',
  imports: [PageHeader, DashboardActions, DashboardStats],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastService = inject(ToastService);

  adminDashboardStats: WritableSignal<IAdminStats | null> = signal(null);
  employeeDashboardStats: WritableSignal<IEmployeeStats | null> = signal(null);
  isLoading: WritableSignal<boolean> = signal(false);

  role = this.authService.role;
  employee = this.authService.employee;

  fullName = `${this.employee()?.firstName}, ${this.employee()?.lastName}!`;
  description = `${this.employee()?.position} - ${this.employee()?.department}`;

  ngOnInit(): void {
    if (this.role() === 'admin') {
      this.getAdminDashboard();
    } else if (this.role() === 'employee') {
      this.getEmployeeDashboard();
    }
  }

  getAdminDashboard(): void {
    this.isLoading.set(true);
    this.dashboardService.getAdminDashboard().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.status) {
          this.adminDashboardStats.set(res.data);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastService.showToast('error', 'Error', err.error.message);
        this.isLoading.set(false);
      }
    })
  }

  getEmployeeDashboard(): void {
    this.isLoading.set(true);
    this.dashboardService.getEmployeeDashboard().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.status) {
          this.employeeDashboardStats.set(res.data);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastService.showToast('error', 'Error', err.error.message);
        this.isLoading.set(false);
      }
    })
  }
}
