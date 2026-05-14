import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIcon } from '@ng-icons/core';
import { SelectModule } from 'primeng/select';
import { ToastService } from '../../../../core/services/toast';
import { Input } from "../../../../shared/components/input/input";
import { PageHeader } from "../../../../shared/components/page-header/page-header";
import { DEPARTMENTS } from '../../../../shared/constants/department';
import { globalValidator } from '../../../../shared/helpers/global-validators';
import { IUpdateEmployeeFormData } from '../../models/employee';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-employee-form',
  imports: [PageHeader, ReactiveFormsModule, Input, SelectModule, RouterLink, NgIcon],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss',
})
export class EmployeeForm implements OnInit {
  private readonly employeeService = inject(EmployeeService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);

  isEditMode: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  employeeId: WritableSignal<string> = signal('');

  employeeForm!: FormGroup;
  departments = DEPARTMENTS;
  roles = [
    { label: 'Employee', value: 'employee' },
    { label: 'Admin', value: 'admin' },
  ];

  ngOnInit(): void {
    this.initForm();
    this.getEmployeeId();
  }

  getEmployeeId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (value) => {
        if (value.get('id')) {
          this.employeeId.set(value.get('id') as string);
          this.isEditMode.set(true);
          this.getEmployee(this.employeeId());
          this.employeeForm.get('password')?.clearValidators();
          this.employeeForm.get('password')?.updateValueAndValidity();
        }
      }
    })
  }

  getEmployee(employeeId: string): void {
    this.employeeService.getEmployee(employeeId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.fillForm(res.data);
        }
      },
      error: (err) => {
        this.toastService.showToast('error', 'Error', err.error.message);
      }
    })
  }

  initForm(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', globalValidator.firstName],
      lastName: ['', globalValidator.lastName],
      phoneNumber: ['', globalValidator.phoneNumber],
      bio: ['', globalValidator.bio],
      department: ['', globalValidator.department],
      position: ['', globalValidator.position],
      basicSalary: ['', globalValidator.basicSalary],
      allowances: ['0'],
      deductions: ['0'],
      email: ['', globalValidator.email],
      password: ['', globalValidator.password],
      role: ['employee', globalValidator.role],
    })
  }

  submitForm(): void {
    if (this.employeeForm.valid) {
      if (this.isEditMode()) {
        this.updateEmployee();
      } else {
        this.createEmployee();
      }
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  fillForm(formData: IUpdateEmployeeFormData): void {
    this.employeeForm.patchValue({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      bio: formData.bio,
      department: formData.department,
      position: formData.position,
      basicSalary: formData.basicSalary,
      allowances: formData.allowances,
      deductions: formData.deductions,
      email: formData.user.email,
      password: formData.user.password,
      role: formData.user.role
    })
  }

  createEmployee(): void {
    this.isLoading.set(true);
    this.employeeService.createEmployee(this.employeeForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastService.showToast('success', 'Success', res.message);
          this.router.navigate(['/employees']);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastService.showToast('error', 'Error', err.error.message);
        this.isLoading.set(false);
      }
    })
  }

  updateEmployee(): void {
    this.isLoading.set(true);
    this.employeeService.updateEmployee(this.employeeForm.value, this.employeeId()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastService.showToast('success', 'Success', res.message);
          this.router.navigate(['/employees']);
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
