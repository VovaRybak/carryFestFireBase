import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';
// import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  public _authData: any;
  constructor(private afAuth: AngularFireAuth, private router: Router) { }
  initAuthState(): void {
    const userInfo = localStorage.userInfo;
    this._authData = userInfo ? JSON.parse(userInfo) : null;
  }
  private storeAuthData(userInfo: any): void{
    const userData = Object.assign(JSON.parse(localStorage.getItem('userInfo')), userInfo);
    localStorage.setItem('userInfo', JSON.stringify(userData));
  }
  setAuthData(user: any): void {
    this.storeAuthData(user);
    this.initAuthState();
    this.router.navigate(['me/profile']);
  }
  get isLoggedIn(): boolean {
    return !!this._authData;
  }
}
