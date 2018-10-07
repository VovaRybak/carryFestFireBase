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
import { FacebookModule } from 'ngx-facebook';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AuthGuard} from './guards/auth.guard';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoaderSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FacebookModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    AngularFireAuthModule,
  ],
  providers: [FirebaseService, FilesOperationsService, LoaderSpinnerService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
