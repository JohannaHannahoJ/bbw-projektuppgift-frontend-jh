import { Component, inject } from '@angular/core';
import { MenuService } from '../../core/services/menu.service';
import { CategoryService } from '../../core/services/category.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-guest-menu',
  imports: [DecimalPipe],
  templateUrl: './guest-menu.html',
  styleUrl: './guest-menu.css',
})
export class GuestMenu {

  menuService = inject(MenuService);
  categoryService = inject(CategoryService);

  menuItems = this.menuService.menuItems;
  categories = this.categoryService.categories;

  menuError = this.menuService.errorMessage;

  ngOnInit() {
    this.menuService.loadMenuItems();
    this.categoryService.loadCategories();

  }
  
  // filtrerar fram tillgängliga meny-items som tillhör en viss kategori
  getItemsByCategory(categoryId: number) {
    return this.menuItems()
      .filter(item =>
        item.category_id === categoryId && // matchar rätt kategori
        item.is_available // visar tillgängliga rätter
      );
  }

}