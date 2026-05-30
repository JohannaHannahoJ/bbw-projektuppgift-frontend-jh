import { Component } from '@angular/core';
import { GuestMenu } from '../../components/guest-menu/guest-menu';
import { MessageForm } from '../../components/message-form/message-form';

@Component({
  selector: 'app-home',
  imports: [GuestMenu, MessageForm],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
