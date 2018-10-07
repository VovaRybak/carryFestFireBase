import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthData} from '../interfaces/auth-data';
import {Observable} from 'rxjs/Observable';
import UserCredential = firebase.auth.UserCredential;
import {from} from 'rxjs/internal/observable/from';
import {tap} from 'rxjs/operators';
import {AuthService} from '../../../services/auth.service';

@Injectable()
export class StartupService {

  constructor(private angularFireAuth: AngularFireAuth, private auth: AuthService) { }
  public signInWithEmailAndPassword(authData: AuthData): Observable<UserCredential> {
    return from(this.angularFireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password))
      .pipe(tap((userData) => {
        const userInfo = {userID: userData.user.uid, accessToken: userData.user.refreshToken};
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        this.auth.setAuthData(userInfo);
      }));
  }

}
