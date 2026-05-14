import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

import { NgIcon } from '@ng-icons/core';
import { SelectModule } from 'primeng/select';

import { ToastService } from '../../../../core/services/toast';
import { EmptyState } from "../../../../shared/components/empty-state/empty-state";
import { PageHeader } from "../../../../shared/components/page-header/page-header";
import { ALL_DEPARTMENTS_OPTION, DEPARTMENTS } from '../../../../shared/constants/department';
import { EmployeeCard } from "../../components/employee-card/employee-card";
import { IEmployee } from '../../models/employee';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-employee-list',
  imports: [PageHeader, NgIcon, SelectModule, FormsModule, EmployeeCard, EmptyState],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeList implements OnInit {
  private readonly employeeService = inject(EmployeeService);
  private readonly toastService = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);

  departments = [ALL_DEPARTMENTS_OPTION, ...DEPARTMENTS];
  employees: WritableSignal<IEmployee[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(false);
  private searchSubject = new Subject<string>();

  selectedDepartment: string = '';
  employeeName: string = '';

  totalEmplyee: number = 0;

  ngOnInit(): void {
    this.getEmployees();
    this.listenToEmployeeSearch();
  }

  getEmployees(employeeName?: string, department?: string): void {
    this.isLoading.set(true);
    this.employeeService.getEmployees(employeeName, department).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.employees.set(res.data);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastService.showToast('error', 'Error', err.error.message);
        this.isLoading.set(false);
      }
    })
  }

  deleteEmployee(employeeId: string): void {
    this.isLoading.set(true);
    this.employeeService.deleteEmployee(employeeId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.toastService.showToast('success', 'Success', res.message);
          this.getEmployees();
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toastService.showToast('error', 'Error', err.error.message);
        this.isLoading.set(false);
      }
    })
  }

  onDepartmentChange(event: any): void {
    this.selectedDepartment = event.value;
    this.getEmployees(undefined, this.selectedDepartment);
  }

  private listenToEmployeeSearch(): void {
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (value) => {
        this.employeeName = value;
        this.getEmployees(this.employeeName);
      }
    })
  }

  onSearch(): void {
    this.searchSubject.next(this.employeeName);
  }
}
