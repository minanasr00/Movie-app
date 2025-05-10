import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storageService: StorageService) {}

 register(username: string, email: string, password: string): Observable<any> {
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const userExists = users.some((user: any) => user.username === username || user.email === email);

  if (userExists) {
    return throwError(() => ({
      error: { message: 'Username or email already exists.' }
    }));
  }

  const newUser = { username, email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  // Save current user for session
  this.storageService.saveUser(newUser);

  return of(newUser); // ✅ Return the full user object
}


  login(username: string, password: string): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.username === username && u.password === password);

    if (!user) {
      return throwError(() => ({
        error: { message: 'Invalid username or password.' }
      }));
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
     this.storageService.saveUser(user);
    return of({ message: 'Login successful!', user });
    
  }

  logout(): Observable<any> {
    localStorage.removeItem('currentUser');
    return of({ message: 'Logged out successfully.' });
     
  }
isLoggedIn(): boolean {
  return !!localStorage.getItem('currentUser');
}

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
}
