import { Component, DestroyRef, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { NgIcon } from '@ng-icons/core';
import { ToastService } from '../../../../core/services/toast';
import { Input } from "../../../../shared/components/input/input";
import { globalValidator } from '../../../../shared/helpers/global-validators';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login-form',
  imports: [Input, NgIcon, ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);

  loading: WritableSignal<boolean> = signal(false);
  loginForm!: FormGroup;
  role = input.required<string>();

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    if (this.role() === 'admin') {
      this.loginForm = this.fb.group({
        email: ['admin@gmail.com', globalValidator.email],
        password: ['123456', globalValidator.password]
      })
    } else {
      this.loginForm = this.fb.group({
        email: ['omarali@gmail.com', globalValidator.email],
        password: ['P@ssw0rd', globalValidator.password]
      })
    }
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.authService.login(this.loginForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          if (res.data.user.role === this.role()) {
            this.authService.role.set(res.data.user.role);
            this.authService.employee.set(res.data);
            this.toastService.showToast('success', 'Success', res.message);
            this.router.navigate(['/dashboard']);
          } else {
            this.toastService.showToast('error', 'Access Denied', 'Not allowed for this portal');
          }
          this.loading.set(false);
        },
        error: (err) => {
          this.toastService.showToast('error', 'Error', err.error.message);
          this.loading.set(false);
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
