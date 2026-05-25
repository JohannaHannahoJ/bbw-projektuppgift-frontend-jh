import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);

  url: string = "http://localhost:3000/api/categories";

  // funktion för headers och token för auth
  private getHeaders() {
    const token = localStorage.getItem("token"); // hämta token fr ls
    return {
      "Authorization": `Bearer ${token}` // skapa headers
    };
  }

  // Hämta alla kategorier
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  // Skapa kategori
  addCategory(category: { name: string }) {
    return this.http.post(this.url, category, {
      headers: this.getHeaders()
    });
  }

  // Uppdatera kategori
  updateCategory(id: number, category: { name: string }) {
    return this.http.put(`${this.url}/${id}`, category, {
      headers: this.getHeaders()
    });
  }
}