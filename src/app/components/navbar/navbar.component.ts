import { CommonModule } from '@angular/common';
import { Component, DoCheck, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedataService } from './../../services/sharedata.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  language !: string;

  constructor(private Sharedata: SharedataService) {
    this.language = "en-US";
  }

  sendDataTOHome(language: string) {
    this.Sharedata.setData(language);


  }

}
