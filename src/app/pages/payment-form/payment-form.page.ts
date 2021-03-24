import { ApplicationRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/commonService';
import { format } from 'date-fns';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.page.html',
  styleUrls: ['./payment-form.page.scss'],
})
export class PaymentFormPage implements OnInit {

  home_img = "assets/footer_menu/home_no_Active.png";
  route_img = "assets/footer_menu/ruta_active.png";
  client_img = "assets/footer_menu/cliente_no_active.png";
  menu_img = "assets/footer_menu/menu_no_Active.png";

  paymentMethods = []

  method;
  cuotas;
  penalidad = 0;
  total = 0

  loanData
  moreInfo
  payment_type = '1'
  option_val

  transactions
  receipt

  constructor(
    public navCtrl: NavController,
    private api: ApiService,
    public comService: CommonService,
    private router: ActivatedRoute,
    private storage: Storage,
    private route: Router,
    private applicationRef: ApplicationRef
  ) {
    router.queryParams.subscribe(params => {
      const { presta, ...otherParams } = params;
      if (presta) {
        this.loanData = presta;
        console.log('loanData == ', this.loanData);
        this.getMoreInfo();
      }
    })
  }

  async ngOnInit() {

  }

  async ionViewDidEnter() {
    this.api.requestGetData('getRepaymentMethod').subscribe(result => {
      console.log('paymentMethods == ', result);
      this.paymentMethods = result.methods
    });
    this.option_val = await this.storage.get('pago');    
    this.makeReceipt();
    this.applicationRef.tick();
  }

  async getMoreInfo() {
    var sendData = {
      user_id: this.comService.currentUser.id,
      business_id: this.comService.currentUser.business_id,
      loan_id: this.loanData?.id
    }
    console.log('send data == ', sendData);
    await this.comService.presentLoading();
    if (this.comService.networkStatus == 'off') {
      this.moreInfo = await this.storage.get(`loan_details_${this.comService.currentUser.business_id}_${this.loanData?.id}`);
      this.comService.hideLoading();
      this.penalidad = this.moreInfo.pending_penalty
      this.cuotas = this.moreInfo.total_pending_balance + this.moreInfo.proxima_count;
      this.total = this.penalidad + this.cuotas
    } else {
      this.api.requestPostData('getLoanById', sendData).subscribe(result => {
        this.comService.hideLoading();
        console.log('result == ', result);
        if (result.status == 200) {
          this.moreInfo = result.loan_detail
        }
        this.storage.set(`loan_details_${this.comService.currentUser.business_id}_${this.loanData?.id}`, this.moreInfo);
        this.penalidad = this.moreInfo.pending_penalty
        this.cuotas = this.moreInfo.total_pending_balance + this.moreInfo.proxima_count;
        this.total = this.penalidad + this.cuotas
      }, error => {
        this.comService.hideLoading();
        console.log('error == ', error)
        this.storage.set(`loan_details_${this.comService.currentUser.business_id}_${this.loanData?.id}`, this.moreInfo);
        this.penalidad = 0
        this.cuotas = 0;
        this.total = this.penalidad + this.cuotas
      })
    }
  }

  ionViewWillLeave() {
    this.paymentMethods = []

    this.method = null;
    this.cuotas = null;
    this.penalidad = 0;
    this.total = 0

    this.loanData = null
    this.moreInfo = null
    this.payment_type = '1'
    this.option_val = null

    this.transactions = null
    this.receipt = null
  }

  makeReceipt() {
    var year = new Date().getFullYear()
    var month = new Date().getMonth() + 1
    var day = new Date().getDate();

    this.receipt = 'CD' + this.loanData?.id

    if (+this.comService.currentUser.id < 10) this.receipt += '0' + this.comService.currentUser.id
    else this.receipt += '' + this.comService.currentUser.id

    this.receipt += '' + year

    if (month < 10) this.receipt += '0' + month
    else this.receipt += '' + month
    if (day < 10) this.receipt += '0' + day
    else this.receipt += '' + day

    let ddd = new Date()
    if (ddd.getHours() < 10) this.receipt += '0' + ddd.getHours()
    else this.receipt += '' + ddd.getHours()
    if (ddd.getMinutes() < 10) this.receipt += '0' + ddd.getMinutes()
    else this.receipt += '' + ddd.getMinutes()
    if (ddd.getSeconds() < 10) this.receipt += '0' + ddd.getSeconds()
    else this.receipt += '' + ddd.getSeconds()

    console.log('recipt == ', this.receipt)
  }

  async payment() {
    var showReceipt = await this.storage.get('cobrar');
    var position = await this.storage.get('user_location');
    var sendData = {
      loan_id: this.loanData?.id,
      collection_date: format(new Date(), "yyyy-MM-dd"),
      user_id: this.comService.currentUser.id,
      business_id: this.comService.currentUser.business_id,
      borrower_id: this.loanData?.borrower.id,
      receipt: this.receipt,
      repayment_method_id: this.method,
      amount: this.total,
      notes: '',
      repayment_type: this.payment_type,
      lat: position.lat,
      long: position.long
    }
    console.log('sendData == ', sendData)
    await this.comService.presentLoading();
    this.api.requestPostData('saveRepayment', sendData).subscribe(result => {
      this.comService.hideLoading();
      console.log('result == ', result)
      this.comService.presentToast(result.message);
      if (result.status == 200) {
        this.transactions = result.loan_transaction;
        if (showReceipt == 'on') {
          this.navCtrl.navigateRoot('payment-receipt', { queryParams: { presta: { transaction: this.transactions, customer: result.customer } } });
        } else {
          this.navCtrl.navigateRoot('tabs/home');
        }
      }
    }, error => {
      this.comService.hideLoading();
      console.log('error== ', error)
    });
  }

  changeCuotas($event) {
    this.cuotas = $event.target.value
    this.total = +this.cuotas + this.penalidad
  }

  goPage(page) {
    this.navCtrl.navigateRoot(page, { animated: true, animationDirection: 'forward' })
  }

}
