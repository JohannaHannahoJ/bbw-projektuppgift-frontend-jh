import { Component, inject, signal } from '@angular/core';
import { MenuService } from '../../core/services/menu.service';
import { MenuItem } from '../../core/models/menu-item';
import { MenuForm } from "../menu-form/menu-form";
import { CategoryService } from '../../core/services/category.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-menu-management',
  imports: [MenuForm],
  templateUrl: './menu-management.html',
  styleUrl: './menu-management.css',
})
export class MenuManagement {
  menuService = inject(MenuService);
  categoryService = inject(CategoryService);
  authService = inject(AuthService);

  // UI-meddelande
  statusMessage = signal("");

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
    //sparar valt item för att lägga i formuläret
    this.selectedItem = item;

    // Vänta tills DOM är uppdaterat innan scroll
    setTimeout(() => {
      document.getElementById('editForm')
        ?.scrollIntoView({ behavior: 'smooth' }); // scroll till formuläret
    });
  }

  // ta bort item
  deleteItem(id: number) {
    // anropa service för att ta bort item från databasen
    this.menuService.deleteMenuItem(id).subscribe({
      // om req lyckas
      next: () => {
        this.statusMessage.set("Rätt raderad.");
        // ladda om listan så UI uppdateras
        this.menuService.loadMenuItems();
      },
      // felhantering
      error: (error) => {
        // auth-fel, logga ut och redirect
        this.menuService.authService.handleAuthError(error);
        this.statusMessage.set(error.error?.message ?? "Kunde inte radera rätten.");
      }
    });
  }
}