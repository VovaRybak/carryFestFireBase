import { Component, OnInit } from '@angular/core';
import {Languages} from '../../mocks/languages';
import {animate, keyframes, query, stagger, style, transition, trigger} from '@angular/animations';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'carryFest-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  public languagesList;
  public chosenLanguage;
  constructor(private translate: TranslateService) {
    this.languagesList = Languages.LanguagesList;
    this.chosenLanguage = this.translate.currentLang;
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
