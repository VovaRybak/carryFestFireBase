import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {from} from 'rxjs/internal/observable/from';
import {of} from 'rxjs/internal/observable/of';
import {AuthService} from '../../../services/auth.service';
import {switchMap} from 'rxjs/operators';
import {FilesOperationsService} from '../../../services/files-operations.service';

@Injectable()
export class UserInfoService {
  public imageId;
  constructor(private dataBase: AngularFireDatabase, private auth: AuthService, private fileOperations: FilesOperationsService) {}
  public getUserInfo(id?: string) {
      this.getUserRefference(id).on('value', (value) => {
        const parsedQuery = value.val();
        const keys = Object.keys(parsedQuery);
        this.auth.setAuthData(parsedQuery[keys[0]]);
      });
  }
  public getUserRefference(id?: string) {
    const userID = id ? id : JSON.parse(localStorage.getItem('userInfo')).userID;
    return this.dataBase.database.ref().child('users').orderByChild('userID').equalTo(userID);
  }
  addUserImage(file) {
    return this.fileOperations.uploadFile(this.getRandomImageKey(), file)
      .pipe(
        switchMap(snapshot => snapshot.ref.getDownloadURL() ),
        switchMap((imageURL) => this.addPhotoToUserAccount(this.imageId, imageURL)),
        switchMap( () => {
          this.getUserInfo();
          return of(null);
        }));
  }
  public addPhotoToUserAccount(key, url) {
    const userKey: string = JSON.parse(localStorage.getItem('authInfo')).userKey;
    console.log(userKey);
    this.dataBase.object('/users/' + userKey + '/photos')
      .valueChanges()
      .pipe(
        switchMap((value) => {
          if (!value || Object.keys(value).length < 1) {
            return this.dataBase.object('/users/' + userKey + '/').update({backgroundImage: url});
          } else {
            return of(null);
          }
        }
        ),
        switchMap(() => this.dataBase.object('/users/' + userKey + '/photos').update({[key]: { name: 1, likes: 2, url: url }}))
      )
      .subscribe();
    return of(null);
  }
  public getRandomImageKey() {
    this.imageId = Math.random().toString(36).substring(2);
    return this.imageId;
  }
}
