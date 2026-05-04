import { Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-stats-card',
  imports: [NgIcon],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.scss',
})
export class StatsCard {
  title = input.required<string>();
  value = input.required<number | string>();
  icon = input.required<string>();
  isLeave = input<boolean>(false);
}
