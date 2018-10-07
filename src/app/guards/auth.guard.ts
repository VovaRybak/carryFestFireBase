import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url = state.url;
    return this.checkLogin(url);
  }

  canLoad(): boolean {
    return this.checkLogin();
  }

  checkLogin(url?: string): boolean {
    if (url && url === 'startup/sign-in') {
      if (this.auth.isLoggedIn) {
        this.router.navigate(['/me/profile']);
        return false;
      }
      return true;
    } else {
      if (this.auth.isLoggedIn) {
        return true;
      }
      this.router.navigate(['startup/sign-in']);
      return false;
    }
  }
}
