import { Component, inject, input, output } from '@angular/core';
import { RouterLink } from "@angular/router";

import { NgIcon } from '@ng-icons/core';
import { ConfirmationService } from 'primeng/api';
import { IEmployee } from '../../models/employee';

@Component({
  selector: 'app-employee-card',
  imports: [NgIcon, RouterLink],
  templateUrl: './employee-card.html',
  styleUrl: './employee-card.scss',
})
export class EmployeeCard {
  private readonly confirmationService = inject(ConfirmationService);

  employee = input.required<IEmployee>();
  onDelete = output<string>();

  deleteEmployee(employeeId: string): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this employee?',
      header: 'Delete Employee',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'accept-btn',
      rejectButtonStyleClass: 'reject-btn',
      accept: () => {
        this.onDelete.emit(employeeId)
      }
    })
  }
}
