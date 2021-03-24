import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommonService } from 'src/services/commonService';

@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.page.html',
  styleUrls: ['./menu-view.page.scss'],
})
export class MenuViewPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private socialSharing: SocialSharing,
    public comService: CommonService
  ) { }

  ngOnInit() {
  }

  gotoPage(page) {
    this.navCtrl.navigateForward(page);
  }

  gotoHome() {
    this.navCtrl.navigateRoot('tabs/home')
  }

  logout() {
    this.storage.clear();
    // this.storage.remove('user_role');
    this.comService.currentUser = null;
    this.comService.userRole = null;
    this.comService.route_id = null;
    this.comService.route_name = null;
    this.comService.selected_route = null;
    this.navCtrl.navigateRoot('signin');
  }

  openWhatsapp() {
    var phoneNumber = '+18099950460'
    this.socialSharing.shareViaWhatsAppToReceiver(phoneNumber, 'Hello. I am using T-Cobro app').then(() => {

    })
  }

}
