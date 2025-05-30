import { CommonModule } from '@angular/common';
import { Component, DoCheck, EventEmitter, Output, OnInit} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedataService } from './../../services/sharedata.service';
import { StorageService } from './../../services/storage.service';
import { AuthService } from './../../services/auth.service';
import { MovieService } from '../../services/movie.service';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit , DoCheck {

movieLength !: number | undefined ;
  constructor(private Sharedata: SharedataService ,private storageService: StorageService, private authService: AuthService , private wishlist :MovieService) {}

  language: string = 'en-US';
  sendDataTOHome(language: string) {
    this.Sharedata.setData(language);
  }
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  ngOnInit(): void {
    this.storageService.isLoggedIn$.subscribe(isLogged => {
      this.isLoggedIn = isLogged;

      if (isLogged) {
        const user = this.storageService.getUser();
        this.roles = user.roles;


        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
        this.username = user.username;
      } else {
        this.showAdminBoard = false;
        this.showModeratorBoard = false;
        this.username = undefined;
      }
    });
  }
  ngDoCheck(): void {
    if (this.isLoggedIn) {
      this.movieLength = this.wishlist.getWishlistCount()
      if (this.movieLength === 0) {
        this.movieLength = undefined;
      }
    } else {
      this.movieLength = undefined;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        this.storageService.signOut();
      },
      error: err => {
        console.error(err);
      }
    });
  }
}

