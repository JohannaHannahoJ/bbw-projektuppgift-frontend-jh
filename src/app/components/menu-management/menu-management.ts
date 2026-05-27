import { Component, inject } from '@angular/core';
import { MenuService } from '../../core/services/menu.service';
import { MenuItem } from '../../core/models/menu-item';
import { MenuForm } from "../menu-form/menu-form";
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-menu-management',
  imports: [MenuForm],
  templateUrl: './menu-management.html',
  styleUrl: './menu-management.css',
})
export class MenuManagement {
  menuService = inject(MenuService);
  categoryService = inject(CategoryService);

  // Hämta signal från service som listar meny-items
  menuItems = this.menuService.menuItems;

  // kontrollerar vilket item som redigeras
  selectedItem: MenuItem | null = null;

  ngOnInit() {
    // läser in items vid sidladdning
    this.menuService.loadMenuItems();
    // läser in kategorier
    this.categoryService.loadCategories();
  }

  // Regigera meny-item
  editItem(item: MenuItem) {
    //sparar valt item
    this.selectedItem = item;
  }

  // ta bort item
  deleteItem(id: number) {
    // anropa service för att ta bort item från databasen
    this.menuService.deleteMenuItem(id).subscribe({
      // om req lyckas
      next: () => {
        // ladda om liostan så UI uppdateras
        this.menuService.loadMenuItems();
      },
      // felhantering
      error: (error) => {
        // auth-fel, logga ut och redirect
        this.menuService.authService.handleAuthError(error);
        console.error(error);
      }
    });
  }
}

