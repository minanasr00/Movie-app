
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class BoardUserComponent implements OnInit {
  profileForm!: FormGroup;
  successMessage = '';
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();

    this.profileForm = this.fb.group({
      username: [currentUser?.username || '', Validators.required],
      email: [currentUser?.email || '', [Validators.required, Validators.email]],
      password: [currentUser?.password || '', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [currentUser?.password || '', [Validators.required, Validators.minLength(6)]]
    });
  }

  // 🔁 Utility getters
  get username() {
    return this.profileForm.get('username');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get password() {
    return this.profileForm.get('password');
  }

  get confirmPassword() {
    return this.profileForm.get('confirmPassword');
  }

  // 🔐 Password mismatch checker
  get passwordMismatch(): boolean {
    return this.password?.value !== this.confirmPassword?.value;
  }

  // 🔁 Input validation utility
  isInvalid(controlName: string): boolean {
    const control = this.profileForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  // 🔁 Toggle password visibility
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // 🚀 Form submission
  onSubmit(): void {
    if (this.profileForm.invalid || this.passwordMismatch) {
      this.errorMessage = this.passwordMismatch ? 'Passwords do not match.' : 'Form has validation errors.';
      this.successMessage = '';
      return;
    }

    const updatedUser = {
      username: this.username?.value,
      email: this.email?.value,
      password: this.password?.value
    };

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUsername = this.authService.getCurrentUser().username;
    const index = users.findIndex((u: any) => u.username === currentUsername);

    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      this.storageService.saveUser(updatedUser);
      this.successMessage = 'Profile updated successfully!';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'User not found.';
      this.successMessage = '';
    }
  }
}
