import { Component, signal, WritableSignal } from '@angular/core';

import { PageHeader } from "../../../../shared/components/page-header/page-header";
import { ChangePasswordDialog } from "../../components/change-password-dialog/change-password-dialog";
import { PasswordCard } from "../../components/password-card/password-card";
import { ProfileForm } from "../../components/profile-form/profile-form";

@Component({
  selector: 'app-profile',
  imports: [PageHeader, ProfileForm, PasswordCard, ChangePasswordDialog],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  visible: WritableSignal<boolean> = signal(false);

  showDialog(): void {
    this.visible.set(true);
  }

  closeDialog(): void {
    this.visible.set(false);
  }
}
