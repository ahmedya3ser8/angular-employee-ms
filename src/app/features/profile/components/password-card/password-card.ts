import { Component, output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-password-card',
  imports: [NgIcon],
  templateUrl: './password-card.html',
  styleUrl: './password-card.scss',
})
export class PasswordCard {
  changePassword = output();

  showDialog(): void {
    this.changePassword.emit();
  }
}
