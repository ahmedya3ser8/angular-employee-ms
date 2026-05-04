import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-login-header',
  imports: [NgIcon, RouterLink],
  templateUrl: './login-header.html',
  styleUrl: './login-header.scss',
})
export class LoginHeader {
  role = input.required<string>();
}
