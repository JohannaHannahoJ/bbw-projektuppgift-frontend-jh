import { Component } from '@angular/core';
import { MessageList } from '../../components/message-list/message-list';

@Component({
  selector: 'app-handled-messages',
  imports: [MessageList],
  templateUrl: './handled-messages.html',
  styleUrl: './handled-messages.css',
})
export class HandledMessages {}
