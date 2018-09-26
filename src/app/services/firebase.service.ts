import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {FilesOperationsService} from './files-operations.service';

@Injectable()
export class FirebaseService {
  constructor(private dataBase: AngularFireDatabase, private storage: AngularFireStorage, private fileOperations: FilesOperationsService) { }
  public getUsersInfo() {
    return this.dataBase.list('users').valueChanges();
  }
  public getEvents() {
    return this.dataBase.object('events').valueChanges();
  }
  public putUsersInfo(userInfo) {
    return this.dataBase.list('users').push(userInfo);
  }

  public putEventInfo(eventInfo, file) {
    const imageId = Math.random().toString(36).substring(2);
    this.fileOperations.uploadFile(imageId, file)
      .then(snapshot => {
        snapshot.ref.getDownloadURL()
        .then(downloadURL => {
          eventInfo.imageSrc = downloadURL;
          eventInfo.imageKey = imageId;
          this.dataBase.list('events').push(eventInfo);
        });
    });
  }
  public removeEvent(key, image) {
    this.fileOperations.removeFile(image);
    this.dataBase.list('events').remove(key);
  }
}
