import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import{RedirectService} from'./../../services/RedirectService';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router, // ✅ Inject Router
      private redirectService: RedirectService // ✅ Add this line

  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;

    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        // ✅ Redirect to saved URL or default to /home
      const redirectUrl = this.redirectService.getRedirectUrl() || '/home';
      this.redirectService.clearRedirectUrl();
      this.router.navigate([redirectUrl]);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
}
