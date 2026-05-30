import { Component, inject, signal } from '@angular/core';
import { MessageService } from '../../core/services/message.service';
import { CreateMessage } from '../../core/models/create-message';
import { ApiResponse } from '../../core/models/api-response';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-form',
  imports: [FormsModule],
  templateUrl: './message-form.html',
  styleUrl: './message-form.css',
})
export class MessageForm {

  // signal för meddelanden i frontend
  statusMessage = signal("");

  // hämta service
  messageService = inject(MessageService);

  // formulärfält
  name: string = "";
  email: string = "";
  message: string = "";

  // skicka meddelande
  addMessage(): void {

    const newMessage: CreateMessage = {
      name: this.name,
      email: this.email,
      message: this.message
    };

    // skickar POST-request
    this.messageService.addMessage(newMessage).subscribe({

      // lyckad request
      next: (response: ApiResponse) => {
        this.statusMessage.set(response.message);
        // töm formuläret
        this.name = "";
        this.email = "";
        this.message = "";
      },

      // felhantering
      error: (error) => {
        this.statusMessage.set(error.error?.message ?? "Ditt meddelande kunde inte skickas.");
      }
    });
  }
}