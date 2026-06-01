import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { Message } from '../models/message';
import { firstValueFrom } from 'rxjs';
import { CreateMessage } from '../models/create-message';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  http = inject(HttpClient);
  url: string = "http://localhost:3000/api/messages";

  // Auth-hantering (token, headers, login state)
  authService = inject(AuthService);

  // Signal som lagrar meddelanden
  messages = signal<Message[]>([]);

  // signal för felhantering
  errorMessage = signal("");

  // hämta meddelanden
  async loadMessages(): Promise<void> {
    try {
      const data = await firstValueFrom(
        this.http.get<Message[]>(this.url, {
          headers: this.authService.getAuthHeaders()
        })
      );

      this.messages.set(data);
      this.errorMessage.set("");

    } catch (error) {
      this.authService.handleAuthError(error);
      this.errorMessage.set("Kunde inte läsa meddelanden.");
      console.error(error);
    }
  }

  // skapa message
  addMessage(message: CreateMessage) {
    return this.http.post<ApiResponse>(this.url, message);
  }

  // markera som hanterad
  markAsHandled(id: number) {
    return this.http.put<ApiResponse>(
      `${this.url}/${id}/handled`, {}, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // ta bort
  deleteMessage(id: number) {
    return this.http.delete<ApiResponse>(
      `${this.url}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
