import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);

  url: string = "http://localhost:3000/api/categories";

  // Auth-hantering (token, headers, login state)
  private authService = inject(AuthService);

  // Hämta alla kategorier
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
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