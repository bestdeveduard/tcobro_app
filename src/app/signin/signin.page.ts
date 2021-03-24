import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Router } from "@angular/router";
import { HttpService } from "src/http.service";
import { LoginRequest } from "src/interface/login";
import { TokenResponse } from "src/interface/TokenResponse";
import { User } from "src/interface/User";
import { APIResponse } from "src/interface/APIResponse";
import { Storage } from "@ionic/storage";
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/commonService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalEventService } from 'src/services/events.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: "app-signin",
  templateUrl: "./signin.page.html",
  styleUrls: ["./signin.page.scss"],
})
export class SigninPage implements OnInit {

  signinForm: FormGroup

  constructor(
    private navCtrl: NavController,
    private route: Router,
    private apiService: ApiService,
    private storage: Storage,
    private comService: CommonService,
    private formBuilder: FormBuilder,
    private eventService: GlobalEventService,
    private iab: InAppBrowser
  ) { }

  phone: any;
  password: any;

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  login(data) {
    let req = {
      email: data.email,
      password: data.password,
      c_time: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    }
    this.comService.presentLoading()
    // setTimeout(() => {
    //   this.comService.hideLoading()
    //   this.storage.set('b_user', "test_data").then(() => {
    //     this.eventService.publishSomeData({event: 'login_success'});
    //   });
    //   this.tabs();
    // }, 1500);

    this.apiService.requestPostData('loginadmin', req).subscribe(result => {
      this.comService.hideLoading()
      console.log('login result == ', result)
      if (result.status == 200) {
        this.comService.presentToast(result.message);
        this.comService.currentUser = result.data;
        this.comService.userRole = result.role_name;
        this.storage.set('b_user', result.data).then(() => {
          this.eventService.publishSomeData({event: 'login_success'});
        });
        this.storage.set('user_role', result.role_name);
        if (result.role_name == 'Administrador') {
          this.navCtrl.navigateRoot("change-route");
          this.storage.set('access_rendimiento', true);
        } else {
          this.apiService.requestPostData('getRouteForCollector', {business_id: this.comService.currentUser.business_id, user_id: this.comService.currentUser.id}).subscribe(resp => {
            if (resp.status == 200) {
              this.comService.route_id = resp.route.id
              this.navCtrl.navigateRoot('tabs/home');
            } else {
              this.comService.presentToast(resp.msg);
            }
          });
          if (result.data.collector_role['reports.app_rendimiento'] && result.data.collector_role['reports.app_rendimiento'] == true) {
            this.storage.set('access_rendimiento', true);
          } else {
            this.storage.set('access_rendimiento', false);
          }
        }        
      } else if (result.status == 400) {
        this.comService.presentToast(result.error);
      }
    })
  }

  tabs() {
    this.navCtrl.navigateRoot("tabs/home");
  }

  register_now() {
    // this.route.navigate(["./signup"]);
    const browser = this.iab.create("https://t-cobro.com/tcobro/public/admin_register", '_blank', {
      usewkwebview: "yes",
      clearcache: "yes",
    });
    browser.on('loadstart').subscribe((res: any) => {      
      console.log('signup url == ', res.url);
    });
  }

  forgotpassword() {
    this.route.navigate(["./forgotpassword"]);
  }
}
