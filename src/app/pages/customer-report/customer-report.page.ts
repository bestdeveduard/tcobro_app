import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/commonService';

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.page.html',
  styleUrls: ['./customer-report.page.scss'],
})
export class CustomerReportPage implements OnInit {

  phone_number = "+17076309110";
  customers = []
  canSearchCustomers = []

  last_id = 0;

  demos = [1,2,3,4,5,6,7]

  constructor(
    public navCtrl: NavController,
    private callNumber: CallNumber,
    private socialSharing: SocialSharing,
    private api: ApiService,
    private comService: CommonService,
    private storage: Storage
  ) { }

  async ngOnInit() {
    this.getData(0)
  }

  async ionViewWillEnter() {
    
  }

  async getData(last_id = 0) {    
    if (last_id == 0) {      
      this.customers = []
      this.canSearchCustomers = []
      await this.comService.presentLoading();
    }
    if (this.comService.networkStatus == 'off') {
      this.customers = await this.storage.get(`borrowers_${this.comService.currentUser.business_id}`);
      this.canSearchCustomers = this.customers
      this.comService.hideLoading()    
    } else {
      this.api.requestPostData('getBorrowers', { user_id: this.comService.currentUser.id, business_id: this.comService.currentUser.business_id, last_id: last_id })
      .subscribe(result => {        
        console.log('borrowers == ', result);
        if (last_id == 0) this.comService.hideLoading()
        if (result.status == 200) {
          result.borrowers.forEach(ele => {
            if (!ele.last_name) ele.last_name = "";
            if (ele.active != 0) this.customers.push(ele)
            this.last_id = ele.id
          })
          this.canSearchCustomers = this.customers
          if (result.borrowers.length > 0) this.getData(this.last_id)
          if (result.borrowers.length == 0) this.storage.set(`borrowers_${this.comService.currentUser.business_id}`, this.customers);
        } else if (result.status == 400) {
          this.storage.set(`borrowers_${this.comService.currentUser.business_id}`, this.customers);
        }
      }, error => {   
        if (last_id == 0) this.comService.hideLoading()      
        console.log('borrowers error == ', error)
        this.storage.set(`borrowers_${this.comService.currentUser.business_id}`, this.customers);
      });
    }
  }

  searchLoanData($event) {
    var val = $event.target.value;
    if (val && val.trim() != '') {
      this.customers = this.canSearchCustomers.filter(item => item.first_name.toLowerCase().includes(val.toLowerCase()) || item.last_name.toLowerCase().includes(val.toLowerCase()))
    } else {
      this.customers = this.canSearchCustomers
    }    
  }

  gotoHome() {
    this.navCtrl.navigateRoot('tabs/home')
  }

  gotoCustomerForm() {
    var extras: NavigationExtras = {
      queryParams: {
        from: 'create'
      }
    }
    this.navCtrl.navigateForward('tabs/customer-form', extras)
  }

  showGeneralCustomer(customer) {
    this.navCtrl.navigateForward('tabs/general-customer', { queryParams: { customer: customer } });
  }

  callPhone(phone) {
    this.callNumber.callNumber(phone, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  showMap() {
    this.navCtrl.navigateForward('tabs/show-map')
  }

  openWhatsapp(phone) {
    var phoneNumber = phone;
    this.socialSharing.shareViaWhatsAppToReceiver(phoneNumber, 'Hello. I am using T-Cobro app').then(() => {
    })
  }

}
