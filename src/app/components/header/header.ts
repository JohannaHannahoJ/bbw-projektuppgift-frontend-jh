import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // hämta Angular router
  router = inject(Router);
  // hämta authsevice
  authService = inject(AuthService);

  // logga ut
  logout(): void {
    this.authService.logout();
  }

  // funktion som returnerar vilken sidtyp man är på
  get pageType(): 'home' | 'admin' | '404' {
    // ignorera delen efter # för sidnavigeringen ska funka
    const url = this.router.url;

    if (url.includes('/404')) return '404';
    if (url.includes('/home')) return 'home';

    return 'admin';
  }
}
