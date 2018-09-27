import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {FirebaseService} from './services/firebase.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/storage';
import {FilesOperationsService} from './services/files-operations.service';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormField, MatFormFieldModule, MatInputModule} from '@angular/material';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import {LoaderSpinnerService} from './loader-spinner/loader-spinner.service';
import {AuthService} from './services/auth.service';
import {AngularFireAuthModule} from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    LoaderSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFireAuthModule
  ],
  providers: [FirebaseService, FilesOperationsService, LoaderSpinnerService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
