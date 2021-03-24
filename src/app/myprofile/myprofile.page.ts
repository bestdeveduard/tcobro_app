import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/services/commonService';
import { ApiService } from 'src/services/api.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {

  userData: any;

  password: any;
  repassword: any;

  constructor(
    private storage: Storage,
    public comService: CommonService,
    private apiService: ApiService,
    private route: Router,
    public navCtrl: NavController
  ) {
    this.userData = comService.currentUser
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.getUserData()
  }

  gotBack() {
    console.log('=======================================')
    this.navCtrl.back();
  }

  async getUserData() {
    var user = await this.storage.get('b_user')
    this.userData = user;
    console.log('current user == ', user);
  }

  async update() {
    var confirm_your_pass = await this.comService.getTranslationWord('confirm_your_pass')
    var email_required = await this.comService.getTranslationWord('email_required')
    var invalid_email = await this.comService.getTranslationWord('invalid_email')
    var error_word = await this.comService.getTranslationWord('error')
    if (this.password) {
      if (this.password != this.repassword) {
        this.comService.presentAlert(error_word, confirm_your_pass);
        return;
      }
    }
    if (this.userData.email == '' || !this.userData.email) {
      this.comService.presentAlert(error_word, email_required);
      return;
    } else if (!this.userData.email.includes('@') || !this.userData.email.includes('.com')) {
      this.comService.presentAlert(error_word, invalid_email);
      return;
    }
    let data = {
      user_id: this.userData.id,
      email: this.userData.email,
      first_name: this.userData.first_name,
      last_name: this.userData.last_name,
      business_address: this.userData.business_address,
      phone: this.userData.phone
    }
    if (this.password) data['password'] = this.password;
    this.comService.presentLoading()
    this.apiService.requestPostData('profileUpdate', data).subscribe(result => {
      this.comService.hideLoading()
      console.log('profile update == ', result);
      if (result.status == 200) {
        this.comService.presentToast(result.message);
        this.storage.set('b_user', result.user_data);
      }    
    })
  }

  changeLanguage() {
    this.route.navigate(['./change-language']);
  }

}
