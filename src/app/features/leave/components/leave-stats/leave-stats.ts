import { Component, input } from '@angular/core';

import { StatsCard } from "../../../../shared/components/stats-card/stats-card";
import { Role } from '../../../../core/models/types';
import { ILeaveStats } from '../../models/leave';

@Component({
  selector: 'app-leave-stats',
  imports: [StatsCard],
  templateUrl: './leave-stats.html',
  styleUrl: './leave-stats.scss',
})
export class LeaveStats {
  role = input<Role>();
  leaveStats = input.required<ILeaveStats>();
}
