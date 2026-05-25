import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { MenuService } from '../../core/services/menu.service';
import { CategoryService } from '../../core/services/category.service';
import { MenuItem } from '../../core/models/menu-item';

@Component({
  selector: 'app-menu-form',
  imports: [FormsModule],
  templateUrl: './menu-form.html',
  styleUrl: './menu-form.css',
})
export class MenuForm {
  name: string = "";
  price: number = 0;
  description: string = "";
  is_available: boolean = true;
  is_offer: boolean = false;
  category_id: number = 0;

  message = signal(""); // För meddelanden i frontend

  authService = inject(AuthService);
  menuService = inject(MenuService);
  categoryService = inject(CategoryService);

  // kategorier till dropdown
  categories = this.categoryService.categories;

  addMenuItem(): void {

    const menuItem: MenuItem = {
      name: this.name,
      price: this.price,
      description: this.description,
      is_available: this.is_available,
      is_offer: this.is_offer,
      category_id: this.category_id
    };

    this.menuService.addMenuItem(menuItem).subscribe({

      next: () => {

        this.message.set("Rätt tillagd");

        // töm formulär
        this.name = "";
        this.price = 0;
        this.description = "";
        this.is_available = true;
        this.is_offer = false;
        this.category_id = 0;
      },

      error: (error) => {
        this.message.set(error.error.message);
      }
    });
  }
}
