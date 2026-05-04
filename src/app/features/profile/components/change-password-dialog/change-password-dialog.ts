import { Component, DestroyRef, inject, input, OnInit, output, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthService } from '../../../auth/services/auth';
import { ToastService } from '../../../../core/services/toast';
import { Input } from "../../../../shared/components/input/input";
import { DialogModule } from 'primeng/dialog';
import { NgIcon } from '@ng-icons/core';
import { globalValidator } from '../../../../shared/helpers/global-validators';

@Component({
  selector: 'app-change-password-dialog',
  imports: [ReactiveFormsModule, DialogModule, Input, NgIcon],
  templateUrl: './change-password-dialog.html',
  styleUrl: './change-password-dialog.scss',
})
export class ChangePasswordDialog implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);

  changePasswordForm!: FormGroup;
  isLoading: WritableSignal<boolean> = signal(false);

  close = output<void>();
  visible = input.required<boolean>();

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', globalValidator.currentPassword],
      newPassword: ['', globalValidator.newPassword]
    })
  }

  submitForm(): void {
    if (this.changePasswordForm.valid) {
      this.isLoading.set(true);
      this.authService.changePassword(this.changePasswordForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          console.log(res);
          if (res.success) {
            this.closeDialog();
            this.toastService.showToast('success', 'Success', res.message);
          }
          this.isLoading.set(false);
        },
        error: (err) => {
          console.log(err.error.errors[0].message);
          this.toastService.showToast('error', 'Error', err.error.errors[0].message);
          this.isLoading.set(false);
        }
      })
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }

  closeDialog(): void {
    this.close.emit();
    this.changePasswordForm.reset();
  }
}
