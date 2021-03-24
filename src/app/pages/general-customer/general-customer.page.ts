import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/commonService';

@Component({
  selector: 'app-general-customer',
  templateUrl: './general-customer.page.html',
  styleUrls: ['./general-customer.page.scss'],
})
export class GeneralCustomerPage implements OnInit {

  phone_number = '+17076309110';
  customerData: any;
  loanHistory = []

  constructor(
    public navCtrl: NavController,
    private callNumber: CallNumber,
    public launchNavigator: LaunchNavigator,
    private api: ApiService,
    private router: ActivatedRoute,
    private comService: CommonService,
    private storage: Storage
  ) {
    router.queryParams.subscribe(async (params) => {
      const { customer, ...remainParams } = params
      this.customerData = customer;
      this.customerData['direction'] = this.customerData.address
      // if (this.customerData.geolocation) {
      //   comService.getAddressFromCoords(this.customerData.geolocation.split(',')[0], this.customerData.geolocation.split(',')[1]).then(address => {
      //     this.customerData['direction'] = address;
      //   }).catch(error => {
      //     console.log('error == ', error);
      //     this.customerData['direction'] = this.customerData.address;
      //   })
      // } {
      //   this.customerData['direction'] = this.customerData.address//"Not Found Address";
      // }

      this.getLoanHistoryOfBorrower();
    })
  }

  async getLoanHistoryOfBorrower() {
    await this.comService.presentLoading()
    if (this.comService.networkStatus == 'off') {
      this.loanHistory = await this.storage.get(`loan_history_borrower_${this.comService.route_id}_${this.customerData.id}`);
      this.comService.hideLoading();
    } else {
      this.api.requestPostData('getLoanHistoryOfBorrower', { route_id: this.comService.route_id, user_id: this.comService.currentUser.id, business_id: this.comService.currentUser.business_id, customer_id: this.customerData.id }).subscribe(result => {
        console.log('history == ', result);
        this.comService.hideLoading()
        if (result.status == 200) {
          this.loanHistory = result.loan_history
        }
        this.storage.set(`loan_history_borrower_${this.comService.route_id}_${this.customerData.id}`, this.loanHistory)
      }, error => {
        console.log('error == ', error)
        this.comService.hideLoading()
        this.storage.set(`loan_history_borrower_${this.comService.route_id}_${this.customerData.id}`, this.loanHistory)
      })
    }
  }

  ngOnInit() {
  }

  onTabChange(event) {

  }

  editCustomer() {    
    this.navCtrl.navigateForward('tabs/customer-form', { queryParams: { customer: this.customerData, from: 'edit' } })
  }

  gotoCustomerReport() {
    this.navCtrl.navigateBack('tabs/customer-report')
  }

  callPhone(phone?) {
    this.callNumber.callNumber(this.phone_number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  showMap() {
    var latlng = this.customerData.geolocation.split(',');
    this.api.showMap(this.customerData.geolocation);
  }

  showPaymentForm(presta) {
    this.navCtrl.navigateForward('payment-form', { queryParams: { presta: presta.loan_data } })
  }

  showGeneralLoan(presta) {
    this.navCtrl.navigateForward('tabs/general-loanview', { queryParams: { presta: presta.loan_data } })
  }

  createLoan() {
    this.navCtrl.navigateForward('tabs/loan-form', {queryParams: {customer: this.customerData}});
  }

}
