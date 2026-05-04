import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IColumn } from '../../../../core/models/table';
import { ActionStatus } from '../../../../core/models/types';
import { ToastService } from '../../../../core/services/toast';
import { DataTable } from "../../../../shared/components/data-table/data-table";
import { PageHeader } from "../../../../shared/components/page-header/page-header";
import { LEAVE_COLUMNS } from '../../../../shared/constants/leave-columns.config';
import { AuthService } from '../../../auth/services/auth';
import { AddLeaveDialog } from "../../components/add-leave-dialog/add-leave-dialog";
import { LeaveStats } from "../../components/leave-stats/leave-stats";
import { ILeave, ILeaveStats } from '../../models/leave';
import { LeaveService } from '../../services/leave';

@Component({
  selector: 'app-leave',
  imports: [PageHeader, DataTable, LeaveStats, AddLeaveDialog],
  templateUrl: './leave.html',
  styleUrl: './leave.scss',
})
export class Leave implements OnInit {
  private readonly leaveService = inject(LeaveService);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastService = inject(ToastService);

  columns!: IColumn[];

  visible: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  leaves: WritableSignal<ILeave[]> = signal([]);
  leaveStats: WritableSignal<ILeaveStats> = signal({} as ILeaveStats);
  role = this.authService.role;

  ngOnInit(): void {
    this.initCols();
    if(this.role() === 'admin') {
      this.getLeaves();
    } else {
      this.getMyLeaves();
      this.getLeaveStats();
    }
  }

  initCols(): void {
    this.columns = LEAVE_COLUMNS[this.role()!];
  }

  getLeaves(): void {
    this.isLoading.set(true);
    this.leaveService.getLeaves().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.leaves.set(res.data);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastService.showToast('error', 'Error', err.error.message);
        this.isLoading.set(false);
      }
    })
  }

  getMyLeaves(): void {
    this.isLoading.set(true);
    this.leaveService.getMyLeaves().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.leaves.set(res.data);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastService.showToast('error', 'Error', err.error.message);
        this.isLoading.set(false);
      }
    })
  }

  getLeaveStats(): void {
    this.isLoading.set(true);
    this.leaveService.getLeaveStats().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.leaveStats.set(res.data);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastService.showToast('error', 'Error', err.error.message);
        this.isLoading.set(false);
      }
    })
  }

  handleAction(event: { id: string; status: ActionStatus }): void {
    this.leaveService.updateLeave({ status: event.status }, event.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastService.showToast('success', 'Success', res.message);
          this.getLeaves();
        }
      },
      error: (err) => {
        this.toastService.showToast('error', 'Error', err.error.message);
      }
    })
  }

  showDialog(): void {
    this.visible.set(true);
  }

  closeDialog(): void {
    this.visible.set(false);
  }

  onLeaveCreated(): void {
    this.getMyLeaves();
    this.getLeaveStats();
  }
}
