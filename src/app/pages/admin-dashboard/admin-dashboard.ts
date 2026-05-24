import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  // signal för meddelanden
  message = signal("");

  authService = inject(AuthService)

  logout(): void {
    this.authService.logout();
  }

  // hämtar meddelande från localstorage som skrivs ut till UI
  ngOnInit() {
    const msg = localStorage.getItem("flashMessage");

    if (msg) {
      this.message.set(msg);
      localStorage.removeItem("flashMessage");
    }
  }
}
