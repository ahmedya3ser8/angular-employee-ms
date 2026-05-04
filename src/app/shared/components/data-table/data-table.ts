import { DatePipe } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

import { NgIcon } from '@ng-icons/core';
import { TableModule } from 'primeng/table';
import { ActionStatus } from '../../../core/models/types';
import { IColumn } from '../../../core/models/table';
import { DurationPipe } from '../../pipes/duration-pipe';

@Component({
  selector: 'app-data-table',
  imports: [NgIcon, DatePipe, TableModule, RouterLink, DurationPipe],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTable<T> {
  columns = input.required<IColumn[]>();
  data = input.required<T[]>();
  action = input<'approve-reject' | 'download' | null>(null);
  isLoading = input<boolean>();

  loadingState = signal<{ id: string | null; status: ActionStatus }>({ id: null, status: null });

  onAction = output<{ id: string; status: ActionStatus }>();

  handleAction(id: string, status: ActionStatus): void {
    this.loadingState.set({ id, status });
    this.onAction.emit({ id, status });
  }
}
