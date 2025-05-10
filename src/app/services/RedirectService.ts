import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RedirectService {
  private redirectUrl: string | null = null;

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string | null {
    return this.redirectUrl;
  }

  clearRedirectUrl() {
    this.redirectUrl = null;
  }
}
