import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';
import { MenuItem } from '../models/menu-item';
import { CreateMenuItem } from '../models/create-menu-item';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  http = inject(HttpClient);
  url: string = "http://localhost:3000/api/menu";

  // Auth-hantering (token, headers, login state)
  authService = inject(AuthService);

  // Signal som lagrar meny-items
  menuItems = signal<MenuItem[]>([]);

  // Hämta meny-items
  async loadMenuItems(): Promise<void> {

    try {
      // skickar rquest till API
      const items = await firstValueFrom(
        this.http.get<MenuItem[]>(this.url)
      );

      //Sparar menu-items i signalen
      this.menuItems.set(items);

    } catch (error) {
      this.authService.handleAuthError(error);
      console.error(error);
    }
  }

  // Skapa meny-item/ rätt
  addMenuItem(menuItem: CreateMenuItem) {
    return this.http.post(this.url, menuItem, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Uppdatera Meny-item/rätt
  updateMenuItem(id: number, item: CreateMenuItem) {
    return this.http.put(`${this.url}/${id}`, item, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Ta bort meny-item
  deleteMenuItem(id: number) {
    return this.http.delete(`${this.url}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
