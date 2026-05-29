import { Component, inject, signal } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-category-management',
  imports: [FormsModule],
  templateUrl: './category-management.html',
  styleUrl: './category-management.css',
})
export class CategoryManagement {
  categoryService = inject(CategoryService);
  authService = inject(AuthService);

  name: string = "";
  message = signal("");

  addCategory(): void {

    const category = {
      name: this.name
    };

    this.categoryService.addCategory(category)
      .subscribe({
        next: () => {
          this.name = "";
          this.message.set("Kategori skapad");
        },

        error: (error) => {
          this.authService.handleAuthError(error);
          this.message.set(error.error?.message ?? "Något gick fel");
          console.error(error);
        }
      });
  }
}
