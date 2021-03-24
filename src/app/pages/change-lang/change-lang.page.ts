import { Component, Inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppConfig, APP_CONFIG } from 'src/app/app.config';
import { Constants } from 'src/models/contants.models';
import { CommonService } from 'src/services/commonService';
import { MyEvent } from 'src/services/myevent.services';

@Component({
  selector: 'app-change-lang',
  templateUrl: './change-lang.page.html',
  styleUrls: ['./change-lang.page.scss'],
})
export class ChangeLangPage implements OnInit {

  lang = "es";
  languages: Array<{ code: string, name: string }>;

  constructor(
    @Inject(APP_CONFIG)
    private config: AppConfig,
    private myEvent: MyEvent,
    public navCtrl: NavController,
    private comService: CommonService
    ) {
    this.languages = this.config.availableLanguages;    
    let defaultLang = window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE);
    if (defaultLang) this.lang = defaultLang;
  }

  ngOnInit() {
  }

  selectLang(lang) {
    this.lang = lang
    this.comService.presentLoading()
    setTimeout(() => {
      this.languageConfirm()
    }, 1500);
  }  

  languageConfirm() {
    this.myEvent.setLanguageData(this.lang);
    window.localStorage.setItem(Constants.KEY_DEFAULT_LANGUAGE, this.lang);
  }

}
