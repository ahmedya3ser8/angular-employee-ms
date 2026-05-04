import { Component, DestroyRef, inject, input, OnInit, output, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIcon } from '@ng-icons/core';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ToastService } from '../../../../core/services/toast';
import { Input } from "../../../../shared/components/input/input";
import { globalValidator } from '../../../../shared/helpers/global-validators';
import { IEmployee } from '../../../employees/models/employee';
import { EmployeeService } from '../../../employees/services/employee';
import { PayslipService } from '../../services/payslip';

@Component({
  selector: 'app-add-payslip-dialog',
  imports: [DialogModule, SelectModule, ReactiveFormsModule, NgIcon, Input],
  templateUrl: './add-payslip-dialog.html',
  styleUrl: './add-payslip-dialog.scss',
})
export class AddPayslipDialog implements OnInit {
  private readonly payslipService = inject(PayslipService);
  private readonly employeeService = inject(EmployeeService);
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);

  payslipForm!: FormGroup;
  monthList: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  yearList: number[] = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
  isLoading: WritableSignal<boolean> = signal(false);
  employees: WritableSignal<IEmployee[]> = signal([]);

  visible = input.required<boolean>();
  close = output();
  submitted = output();

  ngOnInit(): void {
    this.initForm();
    this.getEmployees();
  }

  initForm(): void {
    this.payslipForm = this.fb.group({
      month: ['', globalValidator.month],
      year: ['', globalValidator.year],
      basicSalary: ['', globalValidator.basicSalary],
      allowances: ['0'],
      deductions: ['0'],
      employee: ['', globalValidator.employee],
    })
  }

  getEmployees(): void {
    this.employeeService.getEmployees().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          const data = res.data.map((emp) => ({
            ...emp,
            fullName: `${emp.firstName} ${emp.lastName} (${emp.position})`
          }))
          this.employees.set(data);
        }
      },
      error: (err) => {
        this.toastService.showToast('error', 'Error', err.error.message);
      }
    })
  }

  submitForm(): void {
    if (this.payslipForm.valid) {
      this.isLoading.set(true);
      this.payslipService.createPayslip(this.payslipForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          if (res.success) {
            this.closeDialog();
            this.toastService.showToast('success', 'Success', res.message);
            this.submitted.emit();
          }
          this.isLoading.set(false);
        },
        error: (err) => {
          this.toastService.showToast('error', 'Error', err.error.message);
          this.isLoading.set(false);
        }
      })
    } else {
      this.payslipForm.markAllAsTouched();
    }
  }

  closeDialog(): void {
    this.close.emit();
    this.payslipForm.reset();
  }
}
