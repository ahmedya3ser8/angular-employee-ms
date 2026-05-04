import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgIcon } from '@ng-icons/core';
import { ToastService } from '../../../../core/services/toast';
import { Input } from "../../../../shared/components/input/input";
import { globalValidator } from '../../../../shared/helpers/global-validators';
import { IProfileFormData } from '../../models/profile';
import { ProfileService } from '../../services/profile';

@Component({
  selector: 'app-profile-form',
  imports: [Input, ReactiveFormsModule, NgIcon],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.scss',
})
export class ProfileForm implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly fb = inject(FormBuilder);
  private readonly toastService = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);

  profileForm!: FormGroup;
  isLoading: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.initForm();
    this.getProfile();
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      firstName: ['', globalValidator.firstName],
      lastName: ['', globalValidator.lastName],
      email: ['', globalValidator.email],
      position: ['', globalValidator.position],
      bio: ['', globalValidator.bio],
    });
  }

  submitForm(): void {
    if (this.profileForm.valid) {
      this.isLoading.set(true);
      this.profileService.updateProfile(this.profileForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          if (res.success) {
            this.fillFormData(res.data);
            this.toastService.showToast('success', 'Success', res.message);
          }
          this.isLoading.set(false);
        },
        error: (err) => {
          this.toastService.showToast('error', 'Error', err.error.message);
          this.isLoading.set(false);
        }
      })
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  getProfile(): void {
    this.profileService.getProfile().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.success) {
          this.fillFormData(res.data);
        }
      },
      error: (err) => {
        this.toastService.showToast('error', 'Error', err.error.message);
      }
    })
  }

  fillFormData(formData: IProfileFormData): void {
    this.profileForm.patchValue({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      position: formData.position,
      bio: formData.bio,
    })
  }
}
