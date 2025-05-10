import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../app/services/auth.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import {RouterStateSnapshot  } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  if (!this.authService.isLoggedIn()) {
    // Save the return URL in localStorage or a service
    localStorage.setItem('redirectUrl', state.url);
    this.router.navigate(['/login']);
    return false;
  }
  return true;
}


}
