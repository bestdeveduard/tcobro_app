import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MyCurrencyPipe } from 'src/app/pipes/my-currency.pipe';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/commonService';

@Component({
  selector: 'app-route-view',
  templateUrl: './route-view.page.html',
  styleUrls: ['./route-view.page.scss'],
})
export class RouteViewPage implements OnInit {

  loansData = []
  canSearchLoanData = []
  transactions = []
  tabIndex = 0;

  print_data = []
  c_date = ''

  last_id = 0;

  demos = [1,2,3,4]

  constructor(
    public navCtrl: NavController,
    private socialSharing: SocialSharing,
    private callNumber: CallNumber,
    public launchNavigator: LaunchNavigator,
    private api: ApiService,
    public comService: CommonService,
    private storage: Storage,
    private mycurrency: MyCurrencyPipe
  ) { }

  ngOnInit() {
    var yy = new Date().getFullYear();
    var mm = new Date().getMonth() + 1;
    var dd = new Date().getDate();
    var hh = new Date().getHours();
    var mi = new Date().getMinutes();
    var ss = new Date().getSeconds();
    this.c_date += dd > 9 ? '' + dd : '0' + dd;
    this.c_date += mm > 9 ? '-' + mm : '-0' + mm;
    this.c_date += '-' + yy + ' '
    this.c_date += hh > 9 ? '' + hh : '0' + hh;
    this.c_date += mi > 9 ? ':' + mi : ':0' + mi;
    this.c_date += ss > 9 ? ':' + ss : ':0' + ss;
    this.getLoanData();
  }

  ionViewWillEnter() {
    // this.getLoanData();
  }

  searchLoanData($event) {
    var val = $event.target.value;
    if (val && val.trim() != '') {
      this.loansData = this.canSearchLoanData.filter(item => item.borrower.first_name.toLowerCase().includes(val.toLowerCase()) || ('' + item.borrower.last_name).toLowerCase().includes(val.toLowerCase()))
    } else {
      this.loansData = this.canSearchLoanData
    }    
  }

  async getLoanData(last_id = 0) {
    var day = new Date().getDay() + 1;
    var rut = await this.storage.get('ruta');
    let data = {
      route_id: this.comService.route_id,
      business_id: this.comService.currentUser.business_id,
      day_payment: '' + day,
      prestamos: rut ? rut : 'off',
      last_id: last_id
    }
    console.log('send data == ', data)
    
    if (this.comService.networkStatus == 'off') {
      this.loansData = await this.storage.get(`loan_data_${this.comService.route_id}_${day}`);
      this.canSearchLoanData = this.loansData      
    } else {
      if (last_id == 0) {
        this.loansData = [];
        this.canSearchLoanData = [];
        await this.comService.presentLoading()
      }
      this.api.requestPostData('getLoans', data).subscribe(result => {
        console.log('loans == ', result)
        if (last_id == 0) this.comService.hideLoading()        
        if (result.status == 200) {
          result.loans.forEach(ele => {
            this.last_id = ele.id
            this.loansData.push(ele);
          });
          this.canSearchLoanData = this.loansData
          if (result.loans.length > 0) this.getLoanData(this.last_id);
          if (result.loans.length == 0) this.storage.set(`loan_data_${this.comService.route_id}_${day}`, this.loansData);
        } else {
          
        }
      }, error => {
        console.log('error == ', error);   
        if (last_id == 0) this.comService.hideLoading()     
        this.loansData = []
        this.canSearchLoanData = []
        this.storage.set(`loan_data_${this.comService.route_id}_${day}`, this.loansData);
      })
    }
  }

  async getTransactions() {
    let data = {
      route_id: this.comService.route_id,
      business_id: this.comService.currentUser.business_id,
      user_id: this.comService.currentUser.id
    }
    console.log('send data == ', data)
    var c_date = new Date().toLocaleDateString()
    await this.comService.presentLoading()
    if (this.comService.networkStatus == 'off') {
      this.transactions = await this.storage.get(`transaction_data_${this.comService.route_id}_${c_date}`)
      this.comService.hideLoading()
    } else {
      this.api.requestPostData('getTransactionsOfDay', data).subscribe(result => {
        console.log('getTransactionsOfDay == ', result)
        this.comService.hideLoading()
        if (result.status == 200) {
          this.transactions = result.data;
        } else {
          this.transactions = []
        }
        this.storage.set(`transaction_data_${this.comService.route_id}_${c_date}`, this.transactions)
      }, error => {
        console.log('error == ', error)
        this.comService.hideLoading()
        this.transactions = []
        this.storage.set(`transaction_data_${this.comService.route_id}_${c_date}`, this.transactions)
      })
    }
  }

  onTabChange(event) {
    var index = event.detail.index;
    this.tabIndex = index;
    if (index == 0) {
      this.getLoanData()
    } else {
      this.getTransactions()
    }
  }

  showLoanView(presta) {
    this.navCtrl.navigateForward('tabs/general-loanview', { queryParams: { presta: presta } })
  }

  showPaymentForm(presta) {
    this.navCtrl.navigateForward('payment-form', { queryParams: { presta: presta } })
  }

  showPaymentReceipt(presta) {
    this.navCtrl.navigateForward('payment-receipt', { queryParams: { presta: presta } })
  }

  gotoHome() {
    this.navCtrl.navigateRoot('tabs/home')
  }

  gotoLoanForm() {
    this.navCtrl.navigateForward('tabs/loan-form')
  }

  openWhatsapp() {
    var phoneNumber = '+18099950460'
    this.socialSharing.shareViaWhatsAppToReceiver(phoneNumber, 'Hello. I am using T-Cobro app').then(() => {
    });
  }

  callPhone() {
    this.callNumber.callNumber("999999999", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  openMap(presta) {
    // this.navCtrl.navigateForward('tabs/show-map')
    // this.launchNavigator.navigate([
    //   34.1535454,
    //   -119.2186259
    // ]).then(data => {
    // });
    this.api.showMap(presta.borrower.geolocation)
  }

  async printTransaction() {
    this.print_data = []
    var content = {}

    var word = await this.comService.getTranslationWord('summary_of_day')
    content = {
      text: word, size: '11', align: '1'
    }
    this.print_data.push(content);

    content = {
      text: this.c_date, size: '8', align: '1'
    }
    this.print_data.push(content);

    content = {
      text: '===================================', size: '8', align: '0'
    }
    this.print_data.push(content);

    word = await this.comService.getTranslationWord('route')
    content = {
      text: `${word}:    ${this.comService.route_name}`, size: '8', align: '0'
    }
    this.print_data.push(content);

    word = await this.comService.getTranslationWord('user')
    content = {
      text: `${word}:    ${this.comService.currentUser.first_name} ${this.comService.currentUser.last_name}`, size: '8', align: '0'
    }
    this.print_data.push(content);

    content = {
      text: '-----------------------------------', size: '8', align: '0'
    }
    this.print_data.push(content);

    word = await this.comService.getTranslationWord('client')
    var word1 = await this.comService.getTranslationWord('transaction')
    var word2 = await this.comService.getTranslationWord('amount')
    content = {
      text: `#  ${word}       ID ${word1}     ${word2}`, size: '8', align: '0'
    }
    this.print_data.push(content);

    var total = 0;

    this.transactions.forEach(element => {      
      content = {
        text: `${element.customer.first_name} ${element.customer.last_name}     ${element.transaction.id}     ${this.mycurrency.transform(element.transaction.credit)}`, size: '8', align: '0'
      }
      this.print_data.push(content);
      total += +element.transaction.credit;
    });

    word = await this.comService.getTranslationWord('quantity')
    content = {
      text: `             ${word}:    ${this.transactions.length}`, size: '8', align: '0'
    }
    this.print_data.push(content);    
    
    content = {
      text: `             Total:   ${this.mycurrency.transform(total)}`, size: '8', align: '0'
    }
    this.print_data.push(content);

    console.log(this.print_data);
    
    this.comService.checkBluetoothPrinterStatus(this.print_data);
  }

}
