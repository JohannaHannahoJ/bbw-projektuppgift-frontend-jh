import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CategoryManagement } from '../../components/category-management/category-management';
import { MenuManagement } from '../../components/menu-management/menu-management';
import { MenuForm } from "../../components/menu-form/menu-form";

@Component({
  selector: 'app-admin-dashboard',
  imports: [CategoryManagement, MenuManagement, MenuForm],
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

  activeSection: 'menu' | 'categories' | 'add' = 'menu';
}
