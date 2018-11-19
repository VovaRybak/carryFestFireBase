import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthData} from '../interfaces/auth-data';
import {Observable} from 'rxjs/Observable';
import UserCredential = firebase.auth.UserCredential;
import {from} from 'rxjs/internal/observable/from';
import {switchMap, tap} from 'rxjs/operators';
import {AuthService} from '../../../services/auth.service';
import {FirebaseDatabase} from '@angular/fire';
import {of} from 'rxjs/internal/observable/of';
import {AngularFireDatabase} from '@angular/fire/database';
import {FilesOperationsService} from '../../../services/files-operations.service';
import {map} from 'rxjs-compat/operator/map';

@Injectable()
export class StartupService {
  private imageId;
  private userId;

  constructor(private firebaseDataBase: AngularFireDatabase, private angularFireAuth: AngularFireAuth , private auth: AuthService, private filesOperations: FilesOperationsService) { }
  public signInWithEmailAndPassword(authData: AuthData): Observable<UserCredential> {
    return from(this.angularFireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password))
      .pipe(tap((userData) => {
        const userInfo = {userID: userData.user.uid, accessToken: userData.user.refreshToken};
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        this.auth.setAuthData(userInfo);
      }));
  }

  public signUp(data: any) {
    return from(this.angularFireAuth.auth.createUserWithEmailAndPassword(data.email, data.password))
      .pipe(
        switchMap(userID => {
          this.userId = userID.user.uid;
          return this.filesOperations.uploadFile(this.getRandomImageKey(), data.photo);
        }),
        switchMap(snapshot => snapshot.ref.getDownloadURL()),
        switchMap((imageURL) => {
          data['userID'] = this.userId;
          data['imageKey'] = this.imageId;
          data['imageURL'] = imageURL;
          this.setUserData(data);
          return of(null);
        }),
        switchMap(() => this.signInWithEmailAndPassword({email: data.email, password: data.password})),
      )
      .subscribe();
  }
  public setUserData(userData: any) {
    from(this.firebaseDataBase.database.ref('users').push(userData)).subscribe();
  }
  public getRandomImageKey() {
    this.imageId = Math.random().toString(36).substring(2);
    return this.imageId;
  }

}
