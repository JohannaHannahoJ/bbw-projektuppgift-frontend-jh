import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Category } from '../models/category';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http = inject(HttpClient);
  url: string = "http://localhost:3000/api/categories";

  // Auth-hantering (token, headers, login state)
  authService = inject(AuthService);

  // Signal som lagrar kategorier
  categories = signal<Category[]>([]);

  // Hämta kategorier från API
  async loadCategories(): Promise<void> {

    try {
      // skicka request till API
      const data = await firstValueFrom(
        this.http.get<Category[]>(this.url)
      );
      // sparar katergorier i signalen
      this.categories.set(data);

    } catch (error) {
      console.error(error);
    }
  }

  // Skapa kategori
  addCategory(category: { name: string }) {
    return this.http.post(this.url, category, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Uppdatera kategori
  updateCategory(id: number, category: { name: string }) {
    return this.http.put(`${this.url}/${id}`, category, {
      headers: this.authService.getAuthHeaders()
    });
  }
}