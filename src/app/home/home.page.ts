import { Component, OnInit, ViewChild, ElementRef, ApplicationRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/commonService';
import { Storage } from '@ionic/storage';
import { Chart, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { IonRefresher, NavController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit { 

  ////////////////========================

  @ViewChild(IonRefresher, { static: false }) refresher: IonRefresher; 

  routes = []
  total = 0;

  constructor(
    private route: Router,
    private apiService: ApiService,
    public comService: CommonService,
    private storage: Storage,
    private applicationRef: ApplicationRef,
    public navCtrl: NavController,
    private socialSharing: SocialSharing,
  ) { }

  async ngOnInit() {
    this.comService.route_name

    if (this.comService.networkStatus == 'off') {
      this.storage.get('countries').then(countries => {
        this.comService.countries = countries;
      });
    } else {
      this.apiService.requestGetData('getCountries').subscribe(result => {
        console.log('countries == ', result.countries)
        this.comService.countries = result.countries;
        this.storage.set('countries', result.countries)
      });
    }
  }

  async ionViewWillEnter() {
    if (this.comService.currentUser && this.comService.route_id) this.getHomeData()
  }

  openWhatsapp() {
    var phoneNumber = '+18099950460'
    this.socialSharing.shareViaWhatsAppToReceiver(phoneNumber, 'Hello. I am using T-Cobro app').then(() => {
    })
  }

  async getHomeData() {
    this.total = 0;
    await this.comService.presentLoading();
    if (this.comService.networkStatus == 'off') {
      this.routes = await this.storage.get(`home_data_${this.comService.route_id}`);
      this.routes.forEach(ele => {
        if (ele.title == 'loans') this.total -= +ele.value
        else this.total += +ele.value
      })
      this.comService.hideLoading();
    } else {
      this.apiService.requestPostData('homedata', {route_id: this.comService.route_id, user_id: this.comService.currentUser.id, business_id: this.comService.currentUser.business_id}).subscribe(result => {
        console.log('home data == ', result)
        this.comService.hideLoading();
        this.refresher.complete();
        if (result.status == 200) {
          this.routes = [
            { title: 'base', value: result.base },
            { title: 'payment_cash', value: result.efectivo },
            { title: 'other_payment', value: result.otros },
            { title: 'loans', value: result.prestamos }
          ];
          this.total = +result.base + (+result.efectivo) + (+result.otros) - (+result.prestamos);
          this.storage.set(`home_data_${this.comService.route_id}`, this.routes);
        } else {
          this.routes = [
            { title: 'base', value: 0 },
            { title: 'payment_cash', value: 0 },
            { title: 'other_payment', value: 0 },
            { title: 'loans', value: 0 }
          ];
          this.total = 0
          this.storage.set(`home_data_${this.comService.route_id}`, this.routes);
        }
      }, error => {
        this.comService.hideLoading();
        this.refresher.complete();
        this.routes = [
          { title: 'base', value: 0 },
          { title: 'payment_cash', value: 0 },
          { title: 'other_payment', value: 0 },
          { title: 'loans', value: 0 }
        ];
        this.total = 0
        this.storage.set(`home_data_${this.comService.route_id}`, this.routes);
      })
    }    
  }

  refresh() {    
    this.total = 0;
    this.getHomeData()
  }

  doRefresh($event) {
    this.total = 0;
    this.getHomeData()
  } 

}
