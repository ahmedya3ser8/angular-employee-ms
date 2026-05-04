import { Component, DestroyRef, inject, input, OnInit, output, signal, WritableSignal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ToastService } from '../../../../core/services/toast';
import { globalValidator } from '../../../../shared/helpers/global-validators';
import { LeaveService } from '../../services/leave';

@Component({
  selector: 'app-add-leave-dialog',
  imports: [DialogModule, SelectModule, DatePickerModule, ReactiveFormsModule, NgIcon],
  templateUrl: './add-leave-dialog.html',
  styleUrl: './add-leave-dialog.scss',
})
export class AddLeaveDialog implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly leaveService = inject(LeaveService);
  private readonly toastService = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);

  isLoading: WritableSignal<boolean> = signal(false);
  leaveForm!: FormGroup;

  visible = input.required<boolean>();
  close = output();
  submitted = output();

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.leaveForm = this.fb.group({
      type: ['casual', globalValidator.type],
      startDate: ['', globalValidator.startDate],
      endDate: ['', globalValidator.endDate],
      reason: ['', globalValidator.reason],
    })
  }

  submitForm(): void {
    if (this.leaveForm.valid) {
      this.isLoading.set(true);
      this.leaveService.createLeave(this.leaveForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
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
      this.leaveForm.markAllAsTouched();
    }
  }

  closeDialog(): void {
    this.close.emit();
    this.leaveForm.reset();
  }
}
