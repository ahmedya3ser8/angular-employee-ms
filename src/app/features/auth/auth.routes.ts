import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Portal } from './pages/portal/portal';

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Portal
  },
  {
    path: 'login/:role',
    component: Login
  }
];
