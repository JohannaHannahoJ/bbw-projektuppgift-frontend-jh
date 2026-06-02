import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { UserForm } from '../user-form/user-form';

@Component({
  selector: 'app-user-management',
  imports: [UserForm],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagement {
  // signal för UI meddelanden
  statusMessage = signal("");

  // Hämta nödvändiga tjänster
  userService = inject(UserService);
  authService = inject(AuthService);

  // signal från servicen
  users = this.userService.users;

  ngOnInit() {
    this.userService.loadUsers();
  }

  // ta bort användare
  deleteUser(id: number) {
    // anropa service för att uppdatera db
    this.userService.deleteUser(id).subscribe({
      // om sucess
      next: () => {
        this.statusMessage.set("Användaren raderad");
        // ladda om listan
        this.userService.loadUsers();
      },
      // felhantering
      error: (error) => {
        this.authService.handleAuthError(error);
        this.statusMessage.set(error.error?.message ?? "Kunde inte radera användaren.");
      }
    });
  }
}
