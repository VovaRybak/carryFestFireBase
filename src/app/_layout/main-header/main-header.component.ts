import { Component, OnInit } from '@angular/core';
import {Languages} from '../../mocks/languages';
import {animate, keyframes, query, stagger, style, transition, trigger} from '@angular/animations';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../services/auth.service';
import {of} from 'rxjs/internal/observable/of';
import {skipWhile} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'carryFest-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  public languagesList;
  public chosenLanguage;
  public userData;
  public _userData: BehaviorSubject<any>;
  constructor(private translate: TranslateService, public authService: AuthService) {
    this.languagesList = Languages.LanguagesList;
    this.chosenLanguage = this.translate.currentLang;
    this._userData = this.authService._authData;
    this._userData.subscribe((userInfo) => this.userData = userInfo);
    this.translate.onLangChange.subscribe((lang) => {
      this.chosenLanguage = lang.lang;
      localStorage.setItem('language', lang.lang);
      sessionStorage.setItem('language', lang.lang);
    });
  }

  ngOnInit() {
  }
  changeLanguage(language) {
    this.chosenLanguage = language;
    this.translate.use(language);
  }
}
