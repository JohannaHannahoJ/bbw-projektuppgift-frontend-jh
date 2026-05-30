import { Component, inject, signal } from '@angular/core';
import { MessageService } from '../../core/services/message.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-message-list',
  imports: [DatePipe, RouterLink],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList {
  // signal för meddelanden i frontend
  statusMessage = signal("");

  // hämta nödvändiga tjänster
  messageService = inject(MessageService);
  router = inject(Router);
  authService = inject(AuthService);

  // signal från servicen
  messages = this.messageService.messages;

  // Laddar meddelanden när komponentent startas
  ngOnInit() {
    this.messageService.loadMessages();
  }

  // filtrerad lista beroende på aktuell route
  get filteredMessages() {
    // Om på sidan för hanterade meddelanden
    if (this.router.url === '/handled-messages') {
      return this.messages()
        .filter(message => message.is_handled);
    }

    // annars visa ohanterade
    return this.messages()
      .filter(message => !message.is_handled);
  }

  // Klarmarkera meddelanden
  markAsHandled(id: number): void {
    // anropa service för att uppdatera i databasen
    this.messageService.markAsHandled(id).subscribe({
      // om lyckad req
      next: () => {
        this.statusMessage.set("Meddelandet markerades som klart.");
        // ladda om listan så UI uppdateras
        this.messageService.loadMessages();
      },
      // felhantering
      error: (error) => {
        this.authService.handleAuthError(error);
        this.statusMessage.set(error.error?.message ?? "Kunde inte klarmarkera meddelandet.");
      }
    });
  }

  // Funktion för att ta bort meddelanden
  deleteMessage(id: number): void {
    // anropa service för att ta bort meddelande från databassen
    this.messageService.deleteMessage(id).subscribe({
        // om lyckad req
        next: () => {
          this.statusMessage.set("Meddelandet raderades.");
          this.messageService.loadMessages();
        },
        // Felhantering
        error: (error) => {
          this.authService.handleAuthError(error);
          this.statusMessage.set(error.error?.message ?? "Kunde inte radera meddelandet.");
        }
      });
  }
}