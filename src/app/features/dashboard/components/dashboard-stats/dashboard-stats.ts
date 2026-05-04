import { Component, input } from '@angular/core';

import { StatsCard } from "../../../../shared/components/stats-card/stats-card";
import { IAdminStats, IEmployeeStats } from '../../models/dashboard';
import { Role } from '../../../../core/models/types';

@Component({
  selector: 'app-dashboard-stats',
  imports: [StatsCard],
  templateUrl: './dashboard-stats.html',
  styleUrl: './dashboard-stats.scss',
})
export class DashboardStats {
  adminDashboardStats = input<IAdminStats | null>(null);
  employeeDashboardStats = input<IEmployeeStats | null>(null);
  role = input<Role>();
}
