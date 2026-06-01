import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Category } from '../models/category';
import { AuthService } from './auth.service';
import { CreateCategory } from '../models/create-category';
import { ApiResponse } from '../models/api-response';

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
  //Signal för felmeddelnaden
  errorMessage = signal("");


  // Hämta kategorier från API
  async loadCategories(): Promise<void> {

    try {
      // skicka request till API
      const data = await firstValueFrom(
        this.http.get<Category[]>(this.url)
      );
      // sparar katergorier i signalen
      this.categories.set(data);
      this.errorMessage.set(""); // töm ev felmeddelande

    } catch (error) {
      this.authService.handleAuthError(error);
      this.errorMessage.set("Kunde inte ladda kategorier just nu.");
      console.error(error);
    }
  }

  // Skapa kategori
  addCategory(createCategory: CreateCategory) {
    return this.http.post<ApiResponse>(this.url, createCategory, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Uppdatera kategori
  updateCategory(id: number, category: CreateCategory) {
    return this.http.put<ApiResponse>(`${this.url}/${id}`, category, {
      headers: this.authService.getAuthHeaders()
    });
  }
}