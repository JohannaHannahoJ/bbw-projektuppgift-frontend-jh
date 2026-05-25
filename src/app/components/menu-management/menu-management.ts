import { Component, inject } from '@angular/core';
import { MenuService } from '../../core/services/menu.service';
import { MenuItem } from '../../core/models/menu-item';

@Component({
  selector: 'app-menu-management',
  imports: [],
  templateUrl: './menu-management.html',
  styleUrl: './menu-management.css',
})
export class MenuManagement {
  menuService = inject(MenuService);

  // Hämta signal från service som listar meny-items
  menuItems = this.menuService.menuItems;

  // kontrollerar vilket item som redigeras
  selectedItem: MenuItem | null = null;

  ngOnInit() {
    // läser in items vid sidladdning
    this.menuService.loadMenuItems();
  }

  // Regigera meny-item
  editItem(item: MenuItem) {
    //sparar valt item
    this.selectedItem = item;
    // form kommer
    console.log("Edit item:", item);
  }

  // ta bort item
  deleteItem(id: number) {
    this.menuService.deleteMenuItem(id).subscribe(() => {
      // ladda om listan efter delete
      this.menuService.loadMenuItems();
    });
  }

  // Uppdatera 
  updateMenuItem(updatedItem: MenuItem) {
    if (!this.selectedItem) return;

    // skickar uppdaterat item till db
    this.menuService.updateMenuItem(this.selectedItem.id!, updatedItem)
      .subscribe(() => {
        // Ladda om lista vid update
        this.menuService.loadMenuItems();
        // Rensa redigera
        this.selectedItem = null;
      });
  }
}
