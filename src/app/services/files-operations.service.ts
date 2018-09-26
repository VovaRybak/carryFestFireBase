import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable()
export class FilesOperationsService {

  constructor(private dataBase: AngularFireDatabase, private storage: AngularFireStorage) { }
  public uploadFile(imageId, file) {
    return this.storage.ref('uploads/' + imageId).put(file);
  }
  public removeFile(key) {
    this.storage.ref('uploads/' + key).delete();
  }
}
