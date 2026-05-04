import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NgIcon } from '@ng-icons/core';

import { Role } from '../../../../core/models/types';

@Component({
  selector: 'app-dashboard-actions',
  imports: [NgIcon, RouterLink],
  templateUrl: './dashboard-actions.html',
  styleUrl: './dashboard-actions.scss',
})
export class DashboardActions {
  role = input<Role>();
}
