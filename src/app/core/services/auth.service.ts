import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from '../models/login-user';
import { LoginResponse } from '../models/login-response';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient); // används för http-anrop till backend
  url: string = "http://localhost:3000/api";

  token = signal(localStorage.getItem("token") || "");
  username = signal(localStorage.getItem("username") || "");
  isAdmin = signal(localStorage.getItem("is_admin") === "true");

  isLoggedIn = computed(() => !!this.token());

  router = inject(Router);

  // Logga in
  login(user: LoginUser): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url + "/users/login", user)
      .pipe(
        tap(response => {
          this.token.set(response.token);
          this.username.set(user.username);
          this.isAdmin.set(response.is_admin)
          localStorage.setItem("token", response.token);
          localStorage.setItem("username", user.username);
          localStorage.setItem("is_admin", String(response.is_admin));
        })
      )
  }
  // Logga ut
  logout(): void {
    this.token.set("");
    this.username.set("");
    this.isAdmin.set(false);

    localStorage.clear();

    this.router.navigate(["/login"]);
  }

  //Skapa Authorization header med aktuell JWT-token
  getAuthHeaders() {
    return {
      Authorization: `Bearer ${this.token()}`
    };
  }

  // Funktion som loggar ut och redirectar om token saknas eller är ogiltig
  handleAuthError(error: any) {
    if (error.status === 401 || error.status === 403) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
