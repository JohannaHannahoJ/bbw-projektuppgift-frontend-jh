import { Component, inject, signal } from '@angular/core';
import { LoginUser } from '../../core/models/login-user';
import { FormsModule } from '@angular/forms';
import { LoginResponse } from '../../core/models/login-response';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username: string = "";
  password: string = "";

  message = signal("");
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    const msg = localStorage.getItem("flashMessage");

    if (msg) {
      this.message.set(msg);
      localStorage.removeItem("flashMessage");
    }
  }

  login(): void {
    const user: LoginUser = {
      username: this.username,
      password: this.password
    }

    this.authService.login(user).subscribe({
      next: (response: LoginResponse) => {
        localStorage.setItem("flashMessage", "Välkommen " + this.username + "!");
        localStorage.setItem("token", response.token);
        localStorage.setItem("username", this.username);
        localStorage.setItem("is_admin", String(response.is_admin));


        this.router.navigate(["/admin-dashboard"]);
      },

      error: (error) => {
        this.message.set(error.error.message);
      }
    });
  }
}