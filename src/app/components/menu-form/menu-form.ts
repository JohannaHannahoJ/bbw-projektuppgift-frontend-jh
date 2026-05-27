import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../core/services/menu.service';
import { CategoryService } from '../../core/services/category.service';
import { MenuItem } from '../../core/models/menu-item';
import { AuthService } from '../../core/services/auth.service';

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

  // spar vilket item som redigeras
  private _selectedItem: MenuItem | null = null;

  // skicka till parent när edit är klart
  @Output() closeEdit = new EventEmitter<void>();

  // Tar emot item från menu-management
  @Input() set selectedItem(value: MenuItem | null) {

    // sparar valt item
    this._selectedItem = value;

    // fyller formuläret med valt meny-item vid redigering
    if (value) {
      this.name = value.name;
      this.price = value.price;
      this.description = value.description ?? "";
      this.is_available = value.is_available ?? true;
      this.is_offer = value.is_offer ?? false;
      this.category_id = value.category_id;
    }
  }

  // returnerar valt item
  get selectedItem(): MenuItem | null {
    return this._selectedItem;
  }

  menuService = inject(MenuService);
  categoryService = inject(CategoryService);

  // kategorier till dropdown
  categories = this.categoryService.categories;

  saveMenuItem(): void {

    // bygger ett objekt från formuläret
    const menuItem: MenuItem = {
      name: this.name,
      price: this.price,
      description: this.description,
      is_available: this.is_available,
      is_offer: this.is_offer,
      category_id: this.category_id
    };

    // Uppdatera
    if (this.selectedItem) {

      this.menuService.updateMenuItem(
        this.selectedItem.id!,
        menuItem
      ).subscribe({

        next: () => {
          this.message.set("Rätt uppdaterad");
          this.menuService.loadMenuItems();
          this.closeEdit.emit();
          this.resetForm();
        },

        error: (error) => {
          this.authService.handleAuthError(error);
          this.message.set(error.error.message);
        }
      });

    } else {

      this.menuService.addMenuItem(menuItem).subscribe({

        next: () => {
          this.message.set("Rätt tillagd");

          this.menuService.loadMenuItems();

          this.resetForm();
        },

        error: (error) => {
          this.authService.handleAuthError(error);
          this.message.set(error.error.message);
        }
      });
    }
  }

  resetForm() {
    this.name = "";
    this.price = 0;
    this.description = "";
    this.is_available = true;
    this.is_offer = false;
    this.category_id = 0;

    this._selectedItem = null;
  }

}

