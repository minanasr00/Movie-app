
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn()); // ✅ Initial state
  public isLoggedIn$ = this.loggedIn.asObservable(); // ✅ Observable for components

  constructor() {}

  public saveUser(user: any): void {
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this.loggedIn.next(true); // ✅ Notify login
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  public isLoggedIn(): boolean {
    return !!window.sessionStorage.getItem(USER_KEY); // ✅ Fixed key usage
  }

  public signOut(): void {
    window.sessionStorage.clear();
    this.loggedIn.next(false); // ✅ Notify logout
  }
}


