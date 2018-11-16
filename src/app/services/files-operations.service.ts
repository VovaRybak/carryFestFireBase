import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {from} from 'rxjs/internal/observable/from';

@Injectable()
export class FilesOperationsService {

  constructor(private dataBase: AngularFireDatabase, private storage: AngularFireStorage) { }
  public uploadFile(imageId, file) {
    return from(this.storage.ref('uploads/' + imageId).put(file));
  }
  public removeFile(key) {
    this.storage.ref('uploads/' + key).delete();
  }
}
