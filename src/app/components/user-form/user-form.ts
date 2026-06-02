import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateUser } from '../../core/models/create-user';
import { ApiResponse } from '../../core/models/api-response';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  // signal för meddelanden i frontend
  statusMessage = signal("");

  // hämta service
  userService = inject(UserService);
  // formulärfält
  username: string = "";
  password: string = "";
  isAdmin: boolean = false;

  // Lägg till användare
  addUser(): void {

    const newUser: CreateUser = {
      username: this.username,
      password: this.password,
      is_admin: this.isAdmin
    };

    // skickar POST-request
    this.userService.addUser(newUser).subscribe({
      next: (response: ApiResponse) => {
        this.statusMessage.set(response.message);

        setTimeout(() => {
          this.statusMessage.set("");
        }, 2500);

        // rensa formulär
        this.username = "";
        this.password = "";
        this.isAdmin = false;

        // ladda om lista
        this.userService.loadUsers();
      },
      
      // felhantering
      error: (error) => {
        this.statusMessage.set(error.error?.message ?? "Ditt meddelande kunde inte skickas.");
      }
    });
  }
}
