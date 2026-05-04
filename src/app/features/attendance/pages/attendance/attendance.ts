import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PageHeader } from "../../../../shared/components/page-header/page-header";
import { AttendanceService } from '../../services/attendance';
import { ToastService } from '../../../../core/services/toast';
import { IAttendance, IAttendanceStats } from '../../models/attendance';
import { AttendanceStats } from "../../components/attendance-stats/attendance-stats";
import { DataTable } from "../../../../shared/components/data-table/data-table";
import { IColumn } from '../../../../core/models/table';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-attendance',
  imports: [PageHeader, AttendanceStats, DataTable, NgIcon],
  templateUrl: './attendance.html',
  styleUrl: './attendance.scss',
})
export class Attendance implements OnInit {
  private readonly attendanceService = inject(AttendanceService);
  private readonly toastService = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);

  columns!: IColumn[];

  isLoading: WritableSignal<boolean> = signal(false);
  attendances: WritableSignal<IAttendance[]> = signal([]);
  attendanceStats: WritableSignal<IAttendanceStats> = signal({} as IAttendanceStats);

  ngOnInit(): void {
    this.initCols();
    this.getAttendances();
    this.getAttendanceStats();
  }

  initCols(): void {
    this.columns = [
      { field: 'date', header: 'Date', isDate: true },
      { field: 'checkIn', header: 'Check In', isTime: true },
      { field: 'checkOut', header: 'Check Out', isTime: true },
      { field: 'workingHours', header: 'Working Hours', isWorkingHours: true },
      { field: 'dayType', header: 'Day Type', isStatus: true },
      { field: 'status', header: 'Status', isStatus: true },
    ]
  }

  getAttendances(): void {
    this.isLoading.set(true);
    this.attendanceService.getAttendances().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.attendances.set(res.data);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastService.showToast('error', 'Error', err.error.message);
        this.isLoading.set(false);
      }
    })
  }

  getAttendanceStats(): void {
    this.isLoading.set(true);
    this.attendanceService.getAttendanceStats().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.attendanceStats.set(res.data);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastService.showToast('error', 'Error', err.error.message);
        this.isLoading.set(false);
      }
    })
  }

  createAttendance(): void {
    this.isLoading.set(true);
    this.attendanceService.createAttendance().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastService.showToast('success', 'Success', res.message);
          this.getAttendances();
          this.getAttendanceStats();
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastService.showToast('error', 'Error', err.error.message);
        this.isLoading.set(false);
      }
    })
  }
}
