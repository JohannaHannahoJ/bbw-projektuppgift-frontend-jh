import { Component } from '@angular/core';
import { GuestMenu } from '../../components/guest-menu/guest-menu';

@Component({
  selector: 'app-home',
  imports: [GuestMenu],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
