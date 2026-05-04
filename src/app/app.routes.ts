import { Routes } from '@angular/router';

import { AppLayout } from './layouts/app-layout/app-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';

import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then((r) => r.dashboardRoutes)
      },
      {
        path: 'attendance',
        loadChildren: () => import('./features/attendance/attendance.routes').then((r) => r.attendacneRoutes)
      },
      {
        path: 'employees',
        loadChildren: () => import('./features/employees/employees.routes').then((r) => r.employeesRoutes)
      },
      {
        path: 'leave',
        loadChildren: () => import('./features/leave/leave.routes').then((r) => r.leaveRoutes)
      },
      {
        path: 'payslips',
        loadChildren: () => import('./features/payslip/payslip.routes').then((r) => r.payslipsRoutes)
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/profile/profile.routes').then((r) => r.profileRoutes)
      },
    ]
  },
  {
    path: 'auth',
    component: AuthLayout,
    canActivate: [guestGuard],
    loadChildren: () => import('./features/auth/auth.routes').then((r) => r.authRoutes)
  },
];
