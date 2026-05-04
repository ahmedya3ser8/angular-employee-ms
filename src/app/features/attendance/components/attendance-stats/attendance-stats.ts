import { Component, input } from '@angular/core';

import { StatsCard } from "../../../../shared/components/stats-card/stats-card";
import { IAttendanceStats } from '../../models/attendance';

@Component({
  selector: 'app-attendance-stats',
  imports: [StatsCard],
  templateUrl: './attendance-stats.html',
  styleUrl: './attendance-stats.scss',
})
export class AttendanceStats {
  attendanceStats = input.required<IAttendanceStats>();
}
