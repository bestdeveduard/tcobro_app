import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Screenshot } from "@ionic-native/screenshot/ngx";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ChartsModule } from 'ng2-charts';
import { Network } from '@ionic-native/network/ngx';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_CONFIG, BaseAppConfig } from './app.config';
import { IonicStorageModule } from '@ionic/storage';
import { ApiService } from "../services/api.service";
import { CommonService } from "../services/commonService";
import { GlobalEventService } from "../services/events.service";
import { MyCurrencyPipe } from './pipes/my-currency.pipe';
import { HTTP } from '@ionic-native/http/ngx';
import { LaunchNavigator } from "@ionic-native/launch-navigator/ngx";
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { ComponentsModule } from './components/components.module';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { CalendarPageModule } from './pages/calendar/calendar.module';
import { NgCalendarModule  } from 'ionic2-calendar';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PrinterListPageModule } from './modals/printer-list/printer-list.module';
import { NgSelect2Module } from 'ng-select2';
import { AddCommentPageModule } from './modals/add-comment/add-comment.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, MyCurrencyPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    SuperTabsModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule,
    NgxIonicImageViewerModule,
    ChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ComponentsModule,
    CalendarPageModule,
    NgCalendarModule,
    PrinterListPageModule,
    NgSelect2Module,
    AddCommentPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: APP_CONFIG, useValue: BaseAppConfig },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ApiService,
    CommonService,
    GlobalEventService,
    Network,
    Screenshot,
    BluetoothSerial,
    SocialSharing,
    File,
    FileOpener,
    Geolocation,
    CallNumber,
    NativeGeocoder,
    InAppBrowser,
    HTTP,
    LaunchNavigator,
    DatePicker,
    FileTransfer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
