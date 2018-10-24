import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';
import {FirebaseService} from './firebase.service';
import {of} from 'rxjs/internal/observable/of';
// import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  public _authData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor(private afAuth: AngularFireAuth, private router: Router, private fireBaseService: FirebaseService) {
    this.initAuthState();
  }
  initAuthState(): void {
    if (localStorage.userInfo) {
      const userInfo = JSON.parse(localStorage.userInfo);
      this._authData.next(userInfo ? userInfo : null);
    } else {
      this._authData.next('');
    }
  }
  private storeAuthData(userInfo: any): void{
    const userData = Object.assign(JSON.parse(localStorage.getItem('userInfo')), userInfo);
    localStorage.setItem('userInfo', JSON.stringify(userData));
  }
  setAuthData(user: any): void {
    this.storeAuthData(user);
    this.getUserAllInfo(user.userID);
    this.router.navigate(['me/profile']);
  }
  private getUserAllInfo(ID: string) {
    this.fireBaseService.getUserByID(ID).on('value', (value) => {
      const queryResult = value.val();
      const key = Object.keys(queryResult);
      this.storeAuthData(queryResult[key[0]]);
      this.initAuthState();
    });
  }
  public logOut() {
    localStorage.removeItem('userInfo');
    this._authData.next( null);
  }
  get isLoggedIn(): boolean {
    return !!this._authData;
  }
}
