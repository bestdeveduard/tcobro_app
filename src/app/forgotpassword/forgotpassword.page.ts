import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }


  tabs() {
    this.navCtrl.navigateRoot(['./tabs']);
  } 
  signin() {
    this.navCtrl.navigateRoot(['./signin']);
  } 
}
