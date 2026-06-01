import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { CreateUser } from '../models/create-user';
import { ApiResponse } from '../models/api-response';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  url: string = "http://localhost:3000/api/users";

  // Signal som lagrar users
  users = signal<User[]>([]);

  // Auth-hantering (token, headers, login state)
  authService = inject(AuthService);

  // signal för felhantering
  errorMessage = signal("");

  // hämta alla användare
  async loadUsers(): Promise<void> {
    try {
      const users = await firstValueFrom(
        this.http.get<User[]>(this.url, {
          headers: this.authService.getAuthHeaders()
        })
      );

      this.users.set(users);

    } catch (error) {
      this.authService.handleAuthError(error);
      this.errorMessage.set("Kunde inte hämta användare.");
      console.error(error);
    }
  }

  // Skapa ny användare,
  addUser(user: CreateUser) {
    return this.http.post<ApiResponse>(`${this.url}/register`, user, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // radera användare
  deleteUser(id: number) {
    return this.http.delete<ApiResponse>(`${this.url}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
