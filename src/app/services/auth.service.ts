import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }
  login(user) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }
  doRegister(user) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

}
