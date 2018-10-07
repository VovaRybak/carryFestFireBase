import {Component, OnInit} from '@angular/core';
import {FirebaseService} from './services/firebase.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoaderSpinnerService} from './loader-spinner/loader-spinner.service';
import {AuthService} from './services/auth.service';
import {FacebookService, InitParams, LoginResponse} from 'ngx-facebook';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private spinner: LoaderSpinnerService, private translate: TranslateService) {
    if (sessionStorage.getItem('language') !== null) {
      this.translate.use(sessionStorage.getItem('language'));
    } else if (localStorage.getItem('language') !== null) {
      this.translate.use(localStorage.getItem('language'));
    } else {
      this.translate.use('en');
    }
  }
  ngOnInit() {
  }
}
