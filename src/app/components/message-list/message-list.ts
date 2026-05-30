import { Component, inject, signal } from '@angular/core';
import { MessageService } from '../../core/services/message.service';

@Component({
  selector: 'app-message-list',
  imports: [],
  templateUrl: './message-list.html',
  styleUrl: './message-list.css',
})
export class MessageList {
  // signal för meddelanden i frontend
  statusMessage = signal("");

  // hämta service
  messageService = inject(MessageService);

  // signal från servicen
  messages = this.messageService.messages;

  ngOnInit() {
    this.messageService.loadMessages();
  }
}
