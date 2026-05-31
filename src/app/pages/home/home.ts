import { Component } from '@angular/core';
import { GuestMenu } from '../../components/guest-menu/guest-menu';
import { MessageForm } from '../../components/message-form/message-form';
import { About } from "../../components/about/about";

@Component({
  selector: 'app-home',
  imports: [GuestMenu, MessageForm, About],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
