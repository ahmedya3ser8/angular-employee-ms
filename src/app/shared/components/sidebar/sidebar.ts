import { Component, computed, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NgIcon } from '@ng-icons/core';

import { AuthService } from '../../../features/auth/services/auth';
import { MenuItem } from '../../../core/models/sidebar';
import { ToastService } from '../../../core/services/toast';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-sidebar',
  imports: [NgIcon, RouterLink, RouterLinkActive, DrawerModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);

  visible: WritableSignal<boolean> = signal(false);
  employee = this.authService.employee;

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      link: '/dashboard',
      icon: 'lucideLayoutDashboard',
      roles: ['admin', 'employee']
    },
    {
      label: 'Employees',
      link: '/employees',
      icon: 'lucideUsers',
      roles: ['admin']
    },
    {
      label: 'Attendance',
      link: '/attendance',
      icon: 'lucideCalendar',
      roles: ['employee']
    },
    {
      label: 'Leave',
      link: '/leave',
      icon: 'lucideFileText',
      roles: ['admin', 'employee']
    },
    {
      label: 'Payslips',
      link: '/payslips',
      icon: 'lucideDollarSign',
      roles: ['admin', 'employee']
    },
    {
      label: 'Profile',
      link: '/profile',
      icon: 'lucideUser',
      roles: ['admin', 'employee']
    }
  ];

  menuItemsFiltered = computed(() => {
    if (!this.authService.role) return [];
    return this.menuItems.filter(item => item.roles.includes(this.authService.role()));
  });

  logout(): void {
    this.authService.logout().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.authService.employee.set(null);
          this.authService.role.set(null);
          this.toastService.showToast('success', 'Success', res.message);
          this.router.navigate(['/auth/login']);
        }
      },
      error: (err) => {
        this.toastService.showToast('error', 'Error', err.error.message);
        this.authService.employee.set(null);
        this.authService.role.set(null);
      }
    })
  }

  openDrawer(): void {
    this.visible.set(true);
  }
}
