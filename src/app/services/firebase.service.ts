import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {FilesOperationsService} from './files-operations.service';
import {LoaderSpinnerService} from '../loader-spinner/loader-spinner.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

@Injectable()
export class FirebaseService {
  public imageId;
  public userId;
  constructor(private dataBase: AngularFireDatabase, private storage: AngularFireStorage, private fileOperations: FilesOperationsService, private spinner: LoaderSpinnerService) { }
  public getUsersInfo() {
    return this.dataBase.list('users').valueChanges();
  }
  public getEvents() {
    return this.dataBase.object('events').valueChanges();
  }
  public putUsersInfo(userInfo, image) {
    this.spinner.show();
    const imageId = Math.random().toString(36).substring(2);
    this.fileOperations.uploadFile(imageId, image)
      .subscribe(snapshot => {
        snapshot.ref.getDownloadURL()
          .then(downloadURL => {
            userInfo.imageSrc = downloadURL;
            userInfo.imageKey = imageId;
            this.dataBase.list('users').push(userInfo);
            this.spinner.hide();
          });
      });
  }
  getUserByID(id) {
    return this.dataBase.database.ref().child('users').orderByChild('userID').equalTo(id);
  }
  addUserImage(file) {
    this.fileOperations.uploadFile(this.getRandomImageKey(), file)
    .pipe(
      switchMap(snapshot => snapshot.ref.getDownloadURL() ),
      switchMap((imageURL) => this.addPhotoToUserAccount(this.imageId, imageURL))
    )
    .subscribe();
  }
  public addPhotoToUserAccount(key, url) {
    this.dataBase.object('/users/' + '-LRRiNb6ZGTHr9avXdhx/photos').update({[key]: {
      name: 1, likes: 2, url: url
      }});
    this.dataBase.object('/users/' + '-LRRiNb6ZGTHr9avXdhx/photos').valueChanges().subscribe((value) => {
      console.log(value);
    })
    return of(null);
  }
  public getRandomImageKey() {
    this.imageId = Math.random().toString(36).substring(2);
    return this.imageId;
  }
  public putEventInfo(eventInfo, file) {
    this.spinner.show();
    const imageId = Math.random().toString(36).substring(2);
    this.fileOperations.uploadFile(imageId, file)
      .subscribe(snapshot => {
        snapshot.ref.getDownloadURL()
        .then(downloadURL => {
          eventInfo.imageSrc = downloadURL;
          eventInfo.imageKey = imageId;
          this.dataBase.list('events').push(eventInfo);
          this.spinner.hide();
        });
    });
  }
  public removeEvent(key, image) {
    this.fileOperations.removeFile(image);
    this.dataBase.list('events').remove(key);
  }
}
