import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PageHeader } from "../../../../shared/components/page-header/page-header";
import { PayslipService } from '../../services/payslip';
import { IPayslip } from '../../models/payslip';
import { ToastService } from '../../../../core/services/toast';
import { DataTable } from "../../../../shared/components/data-table/data-table";
import { IColumn } from '../../../../core/models/table';
import { AuthService } from '../../../auth/services/auth';
import { PAYSLIP_COLUMNS } from '../../../../shared/constants/payslip-columns.config';
import { AddPayslipDialog } from "../../components/add-payslip-dialog/add-payslip-dialog";

@Component({
  selector: 'app-payslip',
  imports: [PageHeader, DataTable, AddPayslipDialog],
  templateUrl: './payslip.html',
  styleUrl: './payslip.scss',
})
export class Payslip implements OnInit {
  private readonly payslipService = inject(PayslipService);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastService = inject(ToastService);

  columns!: IColumn[];
  payslips: WritableSignal<IPayslip[]> = signal([]);
  visible: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  role = this.authService.role;

  ngOnInit(): void {
    this.initCols();
    if (this.role() === 'admin') {
      this.getPayslips();
    } else {
      this.getMyPayslips();
    }
  }

  initCols(): void {
    this.columns = PAYSLIP_COLUMNS[this.role()!];
  }

  getPayslips(): void {
    this.isLoading.set(true);
    this.payslipService.getPayslips().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.payslips.set(res.data);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastService.showToast('error', 'Error', err.error.message);
        this.isLoading.set(false);
      }
    })
  }

  getMyPayslips(): void {
    this.isLoading.set(true);
    this.payslipService.getMyPayslips().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.payslips.set(res.data);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastService.showToast('error', 'Error', err.error.message);
        this.isLoading.set(false);
      }
    })
  }

  showDialog(): void {
    this.visible.set(true);
  }

  closeDialog(): void {
    this.visible.set(false);
  }
}
