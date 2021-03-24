import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AddCommentPage } from 'src/app/modals/add-comment/add-comment.page';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/commonService';

@Component({
  selector: 'app-general-loanview',
  templateUrl: './general-loanview.page.html',
  styleUrls: ['./general-loanview.page.scss'],
})
export class GeneralLoanviewPage implements OnInit {

  loanData
  moreInfo
  pagos = []
  comments = []

  constructor(
    public navCtrl: NavController,
    private router: ActivatedRoute,
    private api: ApiService,
    public comService: CommonService,
    private storage: Storage,
    private modalCtrl: ModalController
  ) {
    router.queryParams.subscribe(params => {
      const { presta, ...otherParams } = params;
      if (presta) {
        this.loanData = presta;
        this.getMoreInfo();
      }
    })
  }

  ngOnInit() {
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
      this.pagos = this.moreInfo.pagos_data
      this.comments = this.moreInfo.loan_comments
      this.comService.hideLoading();
    } else {
      this.api.requestPostData('getLoanById', sendData).subscribe(result => {
        this.comService.hideLoading();
        console.log('result == ', result);
        if (result.status == 200) {
          this.moreInfo = result.loan_detail
          this.pagos = this.moreInfo.pagos_data
          this.comments = this.moreInfo.loan_comments
        }
        this.storage.set(`loan_details_${this.comService.currentUser.business_id}_${this.loanData?.id}`, this.moreInfo);
      }, error => {
        this.comService.hideLoading();
        console.log('error == ', error)
        this.storage.set(`loan_details_${this.comService.currentUser.business_id}_${this.loanData?.id}`, this.moreInfo);
      })
    }
  }

  onTabChange(event) {

  }

  showPaymentReceipt(presta) {
    this.navCtrl.navigateForward('payment-receipt', { queryParams: { presta: { transaction: presta, customer: this.loanData.borrower } } });
  }

  gotBack() {
    this.navCtrl.back();
  }

  async addComment() {
    var modal = await this.modalCtrl.create({
      component: AddCommentPage,
      componentProps: {loan_id: this.loanData?.id},
      cssClass: 'add_comment'
    });
    modal.onDidDismiss().then(prop => {
      if (prop.role == 'added') {
        prop.data
        this.getMoreInfo();
      }
    });
    modal.present();
  }

}
