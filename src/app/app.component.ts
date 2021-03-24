import { Component, Inject, ViewChildren, QueryList, ApplicationRef } from '@angular/core';

import { Platform, NavController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { TranslateService } from '@ngx-translate/core';
import { MyEvent } from 'src/services/myevent.services';
import { Constants } from 'src/models/contants.models';
import { APP_CONFIG, AppConfig } from './app.config';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { CommonService } from 'src/services/commonService';
import { GlobalEventService } from 'src/services/events.service';
import { ApiService } from 'src/services/api.service';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  rtlSide = "left";
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  loggedinUser: any;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(@Inject(APP_CONFIG) private config: AppConfig,
    private platform: Platform, public navCtrl: NavController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService, private myEvent: MyEvent,
    private route: Router,
    private storage: Storage,
    private comService: CommonService,
    private evenService: GlobalEventService,
    private applicationRef: ApplicationRef,
    private network: Network,
    private apiService: ApiService,
    private geolocation: Geolocation
  ) {
    this.initializeApp();
    this.checkNavUrl();
    this.backButtonEvent();
    // this.foregroundTrack();
    // this.backgroundTrack();

    this.myEvent.getLanguageObservable().subscribe(value => {
      this.checkNavUrl();
      this.globalize(value);
    });

    this.checkNetworkStatus();

    this.evenService.getObservable().subscribe(async (data) => {
      if (data.event == 'login_success') {
        this.loggedinUser = comService.currentUser;
        this.applicationRef.tick();        
      }
    })    
  }

  checkNetworkStatus() {
    let connectedToInternet = true;
    this.network.onDisconnect().subscribe(() => {
      this.comService.networkStatus = 'off';
      connectedToInternet = false;
    });

    this.network.onConnect().subscribe(() => {      
      this.comService.networkStatus = 'on';
    });
  }

  initializeApp() {
    this.platform.ready().then(async () => {

      // this.backgroundMode.enable();
      // this.backgroundMode.disableWebViewOptimizations();
      
      this.geolocation.getCurrentPosition().then((resp) => {
        this.storage.set('user_location', { lat: resp.coords.latitude, long: resp.coords.longitude });
      }).catch((error) => {
        console.log('Error getting location', error);
      });

      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      let defaultLang = window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE);
      this.globalize(defaultLang);
    });
  }

  async checkNavUrl() {    
    var c_user = await this.storage.get('b_user');
    var role_name = await this.storage.get('user_role');
    if (c_user) {
      this.loggedinUser = this.comService.currentUser = c_user;
      this.comService.userRole = role_name
      this.applicationRef.tick();
      if (this.comService.userRole == 'Administrador') {
        this.navCtrl.navigateRoot('change-route');
        this.splashScreen.hide();
      }
      else {
        this.apiService.requestPostData('getRouteForCollector', {business_id: this.comService.currentUser.business_id, user_id: this.comService.currentUser.id}).subscribe(result => {
          this.splashScreen.hide();
          if (result.status == 200) {
            this.comService.route_id = result.route.id;
            this.comService.route_name = result.route.name;
            this.comService.selected_route = result.route;
            this.navCtrl.navigateRoot('tabs/home');
          } else {
            this.navCtrl.navigateRoot('signin');
          }
        });
      }
    } else {
      this.navCtrl.navigateRoot('signin');
      this.splashScreen.hide();
    }
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      var press_back_again = await this.comService.getTranslationWord('press_back_again');
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else {          
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            navigator['app'].exitApp();
          } else {
            this.comService.presentToast(press_back_again);
            this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }

  globalize(languagePriority) {
    this.translate.setDefaultLang("es");
    let defaultLangCode = this.config.availableLanguages[0].code;
    this.translate.use(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
    this.setDirectionAccordingly(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
  }

  setDirectionAccordingly(lang: string) {
    switch (lang) {
      case 'ar': {
        this.rtlSide = "rtl";
        break;
      }
      default: {
        this.rtlSide = "ltr";
        break;
      }
    }
  }

  gotoPage(page) {
    this.route.navigate([page]);
  }

  logout() {
    this.storage.remove('b_user');
    this.storage.remove('user_role');
    this.comService.currentUser = null;
    this.comService.userRole = null;
    this.navCtrl.navigateRoot('signin');
  }  

  foregroundTrack() {
    let options = {
      frequency: 10000,
      enableHighAccuracy: true
    };
    this.geolocation.watchPosition(options)
      .subscribe(async (position: Geoposition) => {
        console.log("foreground location == ", position.coords.latitude, ', ', position.coords.longitude);
        var c_user = await this.storage.get('b_user');
        if (c_user && c_user != '') {          
          let data = {
            user_id: c_user.id,
            lat: position.coords.latitude,
            long: position.coords.longitude
          }
          this.updateTrackLocationRealTime(data);
        }
        else { }
      }
      );
  } 

  updateTrackLocationRealTime(data) {
    this.apiService.requestPostData('updateTrackLocation', data).subscribe(result => {
      console.log('update location == ', result);
    });
  }
}
