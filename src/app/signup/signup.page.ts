import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIResponse } from "src/interface/APIResponse";
import { ToastController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/commonService';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup

  constructor(
    private route: Router,
    private apiService: ApiService,    
    private formBuilder: FormBuilder,
    private comService: CommonService,
    private storage: Storage,
    public navCtrl: NavController
    ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      first_name: ['', Validators.compose([Validators.required])],
      last_name: [''],
      username: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      r_password: ['', Validators.compose([Validators.required])]
    });
  }

  verification() {
    this.route.navigate(['./verification']);
  }

  signup(data) {    
    // let req = {
    //   first_name: data.first_name,
    //   last_name: data.last_name,
    //   username: data.username,
    //   email: data.email,      
    //   password: data.password,
    //   repeatpassword: data.r_password      
    // }
    // this.comService.presentLoading()
    // this.apiService.register(req).subscribe(result => {
    //   this.comService.hideLoading()
    //   console.log('signup result == ', result);
    //   if (result.status == 200) {
    //     this.comService.presentToast(result.message);
    //     if (result.active == 1) {
    //       this.storage.set('b_user', result.data)
    //       this.navCtrl.navigateRoot("home");
    //     } else {
    //       this.route.navigate(['./signin'])
    //     }
    //   } else if (result.status == 400) {
    //     if (result.msg?.username) this.comService.presentToast(result.msg?.username);
    //     else if (result.msg?.email) this.comService.presentToast(result.msg?.email);
    //     else this.comService.presentToast(result.msg);
    //   }
    // })
  }  
}
