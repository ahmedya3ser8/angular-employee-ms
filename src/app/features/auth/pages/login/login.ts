import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { LoginForm } from "../../components/login-form/login-form";
import { LoginHeader } from "../../components/login-header/login-header";

@Component({
  selector: 'app-login',
  imports: [LoginHeader, LoginForm],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);

  role: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.getRole();
  }

  getRole(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (value) => {
        this.role.set(value.get('role')!);
      }
    })
  }
}
