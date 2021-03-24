import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/commonService';
import { CalendarPage } from '../calendar/calendar.page';
import { months } from 'src/models/contants.models'
import { Storage } from '@ionic/storage';
import { format } from 'date-fns';

@Component({
  selector: 'app-loan-report',
  templateUrl: './loan-report.page.html',
  styleUrls: ['./loan-report.page.scss'],
})
export class LoanReportPage implements OnInit {

  start_date: any = format(new Date(), "yyyy-MM-dd");
  start_date1: any = format(new Date(), "dd/MM/yyyy");
  end_date: any = format(new Date(), "yyyy-MM-dd");
  end_date1: any = format(new Date(), "dd/MM/yyyy");

  loanReportData = []

  selected_data
  total_val = 0;
  total_count = 0;
  searched = false;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    public comService: CommonService,
    private api: ApiService,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.comService.route_name
    this.getLoanReport();
  }

  async getLoanReport() {
    this.loanReportData = [];
    this.searched = false
    var sendData = {
      start_date: this.start_date,
      end_date: this.end_date,
      role_name: this.comService.userRole,
      user_id: this.comService.currentUser.id,
      business_id: this.comService.currentUser.business_id,
      route_id: this.comService.route_id
    }
    console.log('sendData == ', sendData);
    await this.comService.presentLoading();
    if (this.comService.networkStatus == 'off') {
      var loan_report = await this.storage.get(`loan_report_data_${this.comService.currentUser.business_id}_${this.comService.route_id}`);
      this.comService.hideLoading();
      if (loan_report) {
        this.loanReportData = loan_report
        this.searched = true
      } else this.searched = false
    } else {
      this.api.requestPostData('getLoanReport', sendData).subscribe(result => {
        this.comService.hideLoading();
        console.log('result == ', result)
        if (result.status == 200) {
          this.total_val = result.total_val
          this.total_count = result.total_count
          var month_val = 0;
          var calc_month = ''
          var borrowers = []
          var len = 0
          result.loan_report.forEach(ele => {
            var app_month = '';
            if (result.over_year) app_month = months[+ele.month - 1] + ' - ' + ele.year
            else app_month = months[+ele.month - 1];
            if (calc_month != app_month) {
              if (calc_month != '') {
                this.loanReportData.push(
                  {
                    month: calc_month,
                    value: month_val,
                    borrowers: borrowers
                  }
                );
              }
              calc_month = app_month;
              month_val = +ele.total;
              borrowers = [ele];
              if (len == result.loan_report.length - 1) {
                this.loanReportData.push(
                  {
                    month: calc_month,
                    value: month_val,
                    borrowers: borrowers
                  }
                );
              }
            } else if (len == result.loan_report.length - 1) {
              month_val += +ele.total
              borrowers.push(ele)
              this.loanReportData.push(
                {
                  month: calc_month,
                  value: month_val,
                  borrowers: borrowers
                }
              );
            } else {
              month_val += +ele.total
              borrowers.push(ele)
            }
            len++
          });
          console.log('this.loanReportData == ', this.loanReportData);
          this.storage.set(`loan_report_data_${this.comService.currentUser.business_id}_${this.comService.route_id}`, this.loanReportData)
          this.searched = true
        } else {
          this.comService.presentToast(result.message)
          this.searched = false
        }
      }, error => {
        this.comService.hideLoading();
        console.log('error == ', error)
        this.searched = false
      })
    }
  }

  async selectDateFunc(date_sel?) {
    let modal = await this.modalCtrl.create({
      component: CalendarPage,
      backdropDismiss: true,
      cssClass: "calendar_modal"
    });
    modal.onDidDismiss().then(data => {
      if (data.role == "select-date") {
        if (date_sel == 'start_date') {
          this.start_date = data.data.realDate
          this.start_date1 = data.data.displayDate
        } else if (date_sel == 'end_date') {
          this.end_date = data.data.realDate
          this.end_date1 = data.data.displayDate
        }
      }
    });
    modal.present();
  }

  gotoRouteView() {
    this.navCtrl.back();
  }

}
