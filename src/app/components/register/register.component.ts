import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { StorageService } from './../../services/storage.service';

@Component({
  standalone:true,
  selector: 'app-register',
  imports:[CommonModule,ReactiveFormsModule,FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
    roles: string[] = [];

showPassword = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}

  constructor(private authService: AuthService, private router: Router ,private storageService: StorageService,) { }

onSubmit(): void {
  if (!this.form.username || !this.form.email || !this.form.password) {
    this.errorMessage = 'All fields are required';
    this.isSignUpFailed = true;
    return;
  }

  const { username, email, password } = this.form;

  this.authService.register(username, email, password).subscribe({
    next: res => {
      // After successful registration, proceed to login
      this.authService.login(username, password).subscribe({
        next: loginRes => {
          this.storageService.saveUser(loginRes.user);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['/home']);
        },
        error: loginErr => {
          console.error('Login after registration failed:', loginErr);
          this.errorMessage = loginErr.error?.message || 'Login failed.';
          this.isSignUpFailed = true;
        }
      });
    },
    error: err => {
      console.error('Registration failed:', err);
      this.errorMessage = err.error?.message || 'Registration failed.';
      this.isSignUpFailed = true;
    }
  });
}

}