import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MyCurrencyPipe } from 'src/app/pipes/my-currency.pipe';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/commonService';

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.page.html',
  styleUrls: ['./payment-receipt.page.scss'],
})
export class PaymentReceiptPage implements OnInit {

  home_img = "assets/footer_menu/home_no_Active.png";
  route_img = "assets/footer_menu/ruta_active.png";
  client_img = "assets/footer_menu/cliente_no_active.png";
  menu_img = "assets/footer_menu/menu_no_Active.png";

  c_date = '';
  distributionData: any;
  capital: boolean;
  interest: boolean;
  ajust: boolean;
  mora: boolean;
  customer: any;
  is_copy: boolean = false;

  transactions;
  receiptInfo
  header
  footer
  screenshotImg

  print_data = []

  constructor(
    public navCtrl: NavController,
    public comService: CommonService,
    private api: ApiService,
    private router: ActivatedRoute,
    private screenshot: Screenshot,
    private socialSharing: SocialSharing,
    private mycurrency: MyCurrencyPipe,
    private storage: Storage
  ) {
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

    router.queryParams.subscribe(params => {
      const { presta, ...otherParams } = params;
      if (presta) {
        this.transactions = presta.transaction;
        this.customer = presta.customer; // borrower
        console.log('transaction == ', this.transactions)
      }
    })
   }

  ngOnInit() {
    this.getUserData()
  }

  async getUserData() {
    var cap = await this.storage.get('capital');
    this.capital = (cap && cap == 'on') ? true : false
    var inte = await this.storage.get('interest');
    this.interest = (inte && inte == 'on') ? true : false
    var aju = await this.storage.get('cargos');
    this.ajust = (aju && aju == 'on') ? true : false
    var mor = await this.storage.get('penalidad');
    this.mora = (mor && mor == 'on') ? true : false
  }

  async ionViewWillEnter() {
    if (this.transactions) {
      var sendData = {
        user_id: this.comService.currentUser.id,
        business_id: this.comService.currentUser.business_id,
        loan_id: this.transactions.loan_id
      }
      await this.comService.presentLoading();
      if (this.comService.networkStatus == "off") {
        this.receiptInfo = await this.storage.get(`loan_details_${this.comService.currentUser.business_id}_${this.transactions.loan_id}`);
        this.comService.hideLoading();
      } else {
        this.api.requestPostData('getLoanById', sendData).subscribe(result => {
          this.comService.hideLoading();
          console.log('result == ', result);
          if (result.status == 200) {
            this.receiptInfo = result.loan_detail
          }
        }, error => {
          this.comService.hideLoading();
          console.log('error == ', error);
        })
      }      
      this.getDistributionData();
    }
  }

  async getDistributionData() {
    if (this.comService.networkStatus == 'off') return;
    this.api.requestPostData('getDistributionData', { receipt: this.transactions.receipt, user_id: this.comService.currentUser.id }).subscribe(result => {
      console.log('distribution == ', result);
      if (result.status == 200) {
        this.distributionData = result;
      }
    })
  }

  async share() {
    await this.comService.autoHideLoading();
    this.header = document.getElementById('top_header')
    this.header.style.display = 'none';
    this.footer = document.getElementById('bottom_footer')
    this.footer.style.display = 'none';
    
    setTimeout(() => {
      this.screenshot.URI(100).then(res => {
        this.screenshotImg = res.URI;
        this.sharingData()
      });
    }, 500);
  }

  sharingData() {
    this.socialSharing.share(null, null, this.screenshotImg).then(res => {
      console.log('share == ', res)
      this.header.style.display = 'block';
      this.footer.style.display = 'block';
    }).catch(error => {
      console.log('error == ', error);
      this.header.style.display = 'block';
      this.footer.style.display = 'block';
    })
  }

  async printTransaction() {
    this.print_data = []
    var content = {}

    content = {
      text: this.comService.currentUser.business_name, size: '11', align: '1'
    }
    this.print_data.push(content);

    content = {
      text: this.comService.currentUser.business_address, size: '8', align: '1'
    }
    this.print_data.push(content);

    content = {
      text: '   ', size: '8', align: '0'
    }
    this.print_data.push(content);

    content = {
      text: this.customer?.first_name + ' ' + this.customer?.last_name, size: '10', align: '0'
    }
    this.print_data.push(content);

    content = {
      text: `ID: ${this.transactions?.loan_id}`, size: '8', align: '0'
    }
    this.print_data.push(content);

    content = {
      text: '   ', size: '8', align: '0'
    }
    this.print_data.push(content);

    var word = await this.comService.getTranslationWord('payment')
    content = {
      text: `${word}:   ${this.mycurrency.transform(this.transactions?.credit)}`, size: '11', align: '0'
    }
    this.print_data.push(content);

    content = {
      text: '   ', size: '8', align: '0'
    }
    this.print_data.push(content);

    word = await this.comService.getTranslationWord('new_balance')
    content = {
      text: `${word}:   ${this.mycurrency.transform(this.receiptInfo?.balance)}`, size: '8', align: '0'
    }
    this.print_data.push(content);

    word = await this.comService.getTranslationWord('balance_in_arrears')
    content = {
      text: `${word}:   ${this.mycurrency.transform(this.receiptInfo?.late_fee_balance)}`, size: '8', align: '0'
    }
    this.print_data.push(content);

    word = await this.comService.getTranslationWord('cuotas_pagadas')
    var word1 = await this.comService.getTranslationWord('of')
    content = {
      text: `${word}:   ${this.receiptInfo?.paid_count} ${word1} ${this.receiptInfo?.total_count}`, size: '8', align: '0'
    }
    this.print_data.push(content);

    word = await this.comService.getTranslationWord('cuotas_pagadas_hoy')
    content = {
      text: `${word}:   ${this.receiptInfo?.paid_count}`, size: '8', align: '0'
    }
    this.print_data.push(content);

    if (this.distributionData && (this.capital || this.interest || this.ajust || this.mora)) {
      if (this.capital) {
        word = await this.comService.getTranslationWord('capital')
        content = {
          text: word + ':  ' + this.mycurrency.transform(this.distributionData.principal), size: '0', align: '1'
        }
        this.print_data.push(content);
      }
      if (this.interest) {
        word = await this.comService.getTranslationWord('interest')
        content = {
          text: word + ':  ' + this.mycurrency.transform(this.distributionData.interest), size: '0', align: '1'
        }
        this.print_data.push(content);
      }
      if (this.ajust) {
        word = await this.comService.getTranslationWord('adjust')
        content = {
          text: word + ':  ' + this.mycurrency.transform(this.distributionData.fees), size: '0', align: '1'
        }
        this.print_data.push(content);
      }
      if (this.mora) {
        word = await this.comService.getTranslationWord('more')
        content = {
          text: word + ':  ' + this.mycurrency.transform(this.distributionData.penalty), size: '0', align: '1'
        }
        this.print_data.push(content);
      }
    }

    content = {
      text: '   ', size: '8', align: '0'
    }
    this.print_data.push(content);

    word = await this.comService.getTranslationWord('receipt_comment')
    content = {
      text: word, size: '8', align: '1'
    }
    this.print_data.push(content);

    content = {
      text: '   ', size: '8', align: '0'
    }
    this.print_data.push(content);
    
    content = {
      text: this.c_date, size: '8', align: '1'
    }
    this.print_data.push(content);

    console.log(this.print_data);
    
    this.comService.checkBluetoothPrinterStatus(this.print_data);
  }

  gotoGeneralLoanview() {
    this.navCtrl.pop()
  }

  goPage(page) {
    this.navCtrl.navigateRoot(page, { animated: true, animationDirection: 'forward' })
  }

}
