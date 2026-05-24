import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { HandledMessages } from './pages/handled-messages/handled-messages';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    { path: "home", component: Home },
    { path: "login", component: Login },
    { path: "admin-dashboard", component: AdminDashboard },
    { path: "handled-messages", component: HandledMessages },
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "404", component: NotFound },
    { path: "**", redirectTo: "404", pathMatch: "full" }
];
