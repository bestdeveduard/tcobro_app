import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CommonService } from 'src/services/commonService';

@Component({
  selector: 'app-list-report',
  templateUrl: './list-report.page.html',
  styleUrls: ['./list-report.page.scss'],
})
export class ListReportPage implements OnInit {

  report = "";
  access_rendimiento = true;

  constructor(
    public navCtrl: NavController,
    public comService: CommonService,
    private storage: Storage
  ) { }

  async ngOnInit() {
    this.comService.userRole == 'Administrador';
    var rendimiento = await this.storage.get('access_rendimiento');
    if (rendimiento && rendimiento == true) {
      this.access_rendimiento = true;
    } else {
      this.access_rendimiento = false;
    }
    console.log('access_rendimiento == ', this.access_rendimiento)
  }

  selectReport(report) {
    this.report = report
    setTimeout(() => {
      this.navCtrl.navigateForward('tabs/general-report')
    }, 1000);
  }

  showLoanReport(report) {
    this.report = report
    setTimeout(() => {
      this.navCtrl.navigateForward('tabs/loan-report');
    }, 1000);
  }

}
