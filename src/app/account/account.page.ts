import { Component, OnInit, Inject, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  userData: any;

  cobrar: boolean;
  pago: boolean;
  capital: boolean
  interest: boolean
  cargos: boolean;
  penalidad: boolean;
  ruta: boolean;

  constructor(@Inject(APP_CONFIG) 
  public config: AppConfig, private route: Router,
  private storage: Storage,
  private applicationRef: ApplicationRef,
  public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getUserData()
  }

  async getUserData() {
    this.userData = await this.storage.get('b_user');

    var cob = await this.storage.get('cobrar');
    this.cobrar = (cob && cob == 'on') ? true : false
    var pag = await this.storage.get('pago');
    this.pago = (pag && pag == 'on') ? true : false
    var cap = await this.storage.get('capital');
    this.capital = (cap && cap == 'on') ? true : false
    var inte = await this.storage.get('interest');
    this.interest = (inte && inte == 'on') ? true : false
    var aju = await this.storage.get('cargos');
    this.cargos = (aju && aju == 'on') ? true : false
    var mor = await this.storage.get('penalidad');
    this.penalidad = (mor && mor == 'on') ? true : false
    var rut = await this.storage.get('ruta');
    this.ruta = (rut && rut == 'on') ? true : false

    this.applicationRef.tick()
  }

  setActiveData(option) {    
    console.log('== ', option)
    switch (option) {
      case 'capital':
        console.log('111 == ', this.capital)
        var val = this.capital ? 'on' : 'off'
        this.storage.set('capital', val);
        break;
      case 'interest':
        console.log('111 == ', this.interest)
        var val = this.interest ? 'on' : 'off'
        this.storage.set('interest', val);
        break;
      case 'cargos':
        console.log('111 == ', this.cargos)
        var val = this.cargos ? 'on' : 'off'
        this.storage.set('cargos', val);
        break;
      case 'penalidad':
        console.log('111 == ', this.penalidad)
        var val = this.penalidad ? 'on' : 'off'
        this.storage.set('penalidad', val);
        break;
      case 'cobrar':
        console.log('111 == ', this.cobrar)
        var val = this.cobrar ? 'on' : 'off'
        this.storage.set('cobrar', val);
        break;
      case 'pago':
        console.log('111 == ', this.pago)
        var val = this.pago ? 'on' : 'off'
        this.storage.set('pago', val);
        break;
      case 'ruta':
        console.log('111 == ', this.ruta)
        var val = this.ruta ? 'on' : 'off'
        this.storage.set('ruta', val);
        break;
      default:
        break;
    }
  }

  myprofile() {
    this.route.navigate(['tabs/myprofile']);
  }
  favorited() {
    this.route.navigate(['./favorited']);
  }
  notification() {
    this.route.navigate(['./notification']);
  }
  help() {
    this.route.navigate(['./help']);
  }
  condition() {
    this.route.navigate(['./condition']);
  }
  change_language() {
    this.route.navigate(['./change-language']);
  }
  buyAppAction() {
    window.open("http://bit.ly/cc_QuickPay", '_system', 'location=no');
  }
  faqs() {
    this.route.navigate(['./faqs']);
  }
}
