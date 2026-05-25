import { Component, inject } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-management',
  imports: [FormsModule],
  templateUrl: './category-management.html',
  styleUrl: './category-management.css',
})
export class CategoryManagement {
  categoryService = inject(CategoryService);

  name: string = "";

  addCategory(): void {

    const category = {
      name: this.name
    };

    this.categoryService.addCategory(category)
      .subscribe({
        next: () => {
          this.name = "";
          console.log("Kategori skapad");
        },

        error: (error) => {
          console.error(error);
        }
      });
  }
}
