import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartType } from 'chart.js';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ModalController, NavController } from '@ionic/angular';
import { CalendarPage } from '../calendar/calendar.page';
import { CalendarModal, CalendarModalOptions } from 'ion2-calendar';
import { CommonService } from 'src/services/commonService';
import { ApiService } from 'src/services/api.service';
import { Storage } from '@ionic/storage';
import { format } from 'date-fns';

@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.page.html',
  styleUrls: ['./general-report.page.scss'],
})
export class GeneralReportPage implements OnInit {

  @ViewChild('capitalchart', { static: true }) capitalchart: ElementRef;
  @ViewChild('intereschart', { static: true }) intereschart: ElementRef;
  @ViewChild('morachart', { static: true }) morachart: ElementRef;
  @ViewChild('totalchart', { static: true }) totalchart: ElementRef;
  @ViewChild('percentchart', { static: true }) percentchart: ElementRef;
  @ViewChild('prestamosChart', { static: true }) prestamosChart: ElementRef;
  @ViewChild('prestCapitalChart', { static: true }) prestCapitalChart: ElementRef;

  public doughnutChartLabels: string[] = ['Capital', 'Interes', 'Mora'];
  public doughnutChartType: ChartType = 'doughnut';

  public capitalchartData = [0, 1];
  public intereschartData = [0, 1];
  public morachartData = [0, 1];
  public totalchartData = [0, 1];
  public percentchartData = [0, 1];
  public prestamoschartData = [0, 1];
  public prestCapitalData = [0, 1];

  public capitalchartColors: any[] = ['green', '#cccccc']
  public intereschartColors: any[] = ['blue', '#cccccc']
  public morachartColors: any[] = ['red', '#cccccc']
  public totalchartColors: any[] = ['orange', '#cccccc']
  public percentchartColors: any[] = ['blue', '#cccccc']

  public doughnutChartBorderColors: any[] = ['#ffffff', '#ffffff']

  myChart: any;
  date: string = '';
  c_year: any;
  start_date: any = "2008-01-01";
  start_date1: any = "01/01/2008";
  end_date: any = format(new Date(), "yyyy-MM-dd");//new Date().toLocaleDateString();  
  end_date1: any = format(new Date(), "dd/MM/yyyy")//new Date().toLocaleDateString();

  total_amount = 2000;

  constructor(
    private datePicker: DatePicker,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public comService: CommonService,
    private api: ApiService,
    private storage: Storage
  ) {
    var year = new Date().getFullYear()
    this.c_year = year
    var month = new Date().getMonth() + 1
    var day = new Date().getDate();
    this.date += '' + year
    if (month < 10) this.date += '-0' + month
    else this.date += '-' + month
    if (day < 10) this.date += '-0' + day
    else this.date += '-' + day
  }

  gotoMenu() {
    this.navCtrl.back()
  }

  refresh() {
    // this.createChart()
    this.myChart.update()
  }

  ngOnInit() {
    this.calcChart()
  }

  async calcChart() {
    this.capitalchartData = [0, 0]
    this.intereschartData = [0, 0]
    this.morachartData = [0, 0]
    this.totalchartData = [0, 0]
    this.percentchartData = [0, 0]
    this.prestamoschartData = [0, 0];
    this.prestCapitalData = [0, 0];
    let sendData = {
      start_date: this.start_date,
      end_date: this.end_date,
      business_id: this.comService.currentUser.business_id,
      route_id: this.comService.route_id
    }
    await this.comService.presentLoading()
    if (this.comService.networkStatus == 'off') {
      var result = await this.storage.get(`general_report_${this.comService.route_id}_${this.comService.currentUser.business_id}`);
      if (result) {
        var sum_val = result.total_principal + result.total_interest + result.total_fees + result.total_penalty;
        this.capitalchartData = sum_val > 0 ? [result.total_principal, sum_val - result.total_principal] : [result.total_principal, 1]
        this.intereschartData = sum_val > 0 ? [result.total_interest + result.total_fees, sum_val - (result.total_interest + result.total_fees)] : [result.total_interest + result.total_fees, 1]
        this.morachartData = sum_val > 0 ? [result.total_penalty, sum_val - result.total_penalty] : [result.total_penalty, 1]
        this.totalchartData = [sum_val, result.total_due - sum_val]
        this.percentchartData = sum_val > 0 ? [result.total_interest + result.total_fees + result.total_penalty, sum_val - (result.total_interest + result.total_fees + result.total_penalty)] : [result.total_interest + result.total_fees + result.total_penalty, 1]

        this.prestamoschartData = result.loans_in_route > 0 ? [result.loan_count, result.loans_in_route - result.loan_count] : [result.loan_count, 1];
        this.prestCapitalData = result.total_disbursed_in_route > 0 ? [result.total_disbursed, result.total_disbursed_in_route - result.total_disbursed] : [result.total_disbursed, 1];        
      }
      this.createChart();
    } else {
      this.api.requestPostData('getGeneralReportForChart', sendData).subscribe(result => {
        this.comService.hideLoading()
        console.log('result => ', result)
        if (result.status == 200) {
          var sum_val = result.total_principal + result.total_interest + result.total_fees + result.total_penalty;
          this.capitalchartData = sum_val > 0 ? [result.total_principal, sum_val - result.total_principal] : [result.total_principal, 1]
          this.intereschartData = sum_val > 0 ? [result.total_interest + result.total_fees, sum_val - (result.total_interest + result.total_fees)] : [result.total_interest + result.total_fees, 1]
          this.morachartData = sum_val > 0 ? [result.total_penalty, sum_val - result.total_penalty] : [result.total_penalty, 1]
          this.totalchartData = [sum_val, result.total_due - sum_val]
          this.percentchartData = sum_val > 0 ? [result.total_interest + result.total_fees + result.total_penalty, sum_val - (result.total_interest + result.total_fees + result.total_penalty)] : [result.total_interest + result.total_fees + result.total_penalty, 1]

          this.prestamoschartData = result.loans_in_route > 0 ? [result.loan_count, result.loans_in_route - result.loan_count] : [result.loan_count, 1];
          this.prestCapitalData = result.total_disbursed_in_route > 0 ? [result.total_disbursed, result.total_disbursed_in_route - result.total_disbursed] : [result.total_disbursed, 1];
          this.createChart()
          this.storage.set(`general_report_${this.comService.route_id}_${this.comService.currentUser.business_id}`, result);
        } else {
          this.comService.presentToast(result.message)
          this.createChart()
        }
      }, error => {
        this.comService.hideLoading()
        console.log('error => ', error)
        this.createChart()
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

    // const options: CalendarModalOptions = {
    //   title: 'BASIC',
    //   color:'danger'
    // };

    // let myCalendar =  await this.modalCtrl.create({
    //   component: CalendarModal,
    //   componentProps: { options }
    // });

    // myCalendar.present();
  }

  // selectDate(date_sel?) {
  //   this.datePicker.show({
  //     date: new Date(),
  //     mode: 'date',
  //     androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
  //   }).then(
  //     date => {
  //       console.log('Got date: ', date)
  //       var selected_date = new Date(date);
  //       var yy = selected_date.getFullYear();
  //       var mm = selected_date.getMonth() + 1;
  //       var dd = selected_date.getDate();
  //       var sel_date = yy + (mm > 9 ? '-' + mm : '-0' + mm) + (dd > 9 ? '-' + dd : '-0' + dd);
  //       if (date_sel == 'start_date') {
  //         this.start_date = sel_date
  //       } else if (date_sel == 'end_date') {
  //         this.end_date = sel_date
  //       }
  //     },
  //     err => console.log('Error occurred while getting date: ', err)
  //   );
  // }

  createChart() {
    this.myChart = new Chart(this.capitalchart.nativeElement, {
      type: this.doughnutChartType,
      data: this.getCapitalChartData(),
      options: this.opts
    });

    this.myChart = new Chart(this.intereschart.nativeElement, {
      type: this.doughnutChartType,
      data: this.getintereschartData(),
      options: this.opts
    });

    this.myChart = new Chart(this.morachart.nativeElement, {
      type: this.doughnutChartType,
      data: this.getmorachartData(),
      options: this.opts
    });

    this.myChart = new Chart(this.totalchart.nativeElement, {
      type: this.doughnutChartType,
      data: this.gettotalchartData(),
      options: this.opts
    });

    this.myChart = new Chart(this.percentchart.nativeElement, {
      type: this.doughnutChartType,
      data: this.getpercentchartData(),
      options: this.opts
    });

    this.myChart = new Chart(this.prestamosChart.nativeElement, {
      type: this.doughnutChartType,
      data: this.prestamosChartData(),
      options: this.opts
    });

    this.myChart = new Chart(this.prestCapitalChart.nativeElement, {
      type: this.doughnutChartType,
      data: this.prestCapitalChartData(),
      options: this.opts
    });
  }

  getCapitalChartData() {
    return {
      labels: this.doughnutChartLabels,
      datasets: [{
        label: 'Daily Technology usage',
        data: this.capitalchartData,
        duration: 2000,
        easing: 'easeInQuart',
        backgroundColor: this.capitalchartColors,
        hoverBackgroundColor: this.doughnutChartBorderColors,
        borderColor: this.doughnutChartBorderColors,
        borderWidth: 1,
      }]
    }
  }

  getintereschartData() {
    return {
      labels: this.doughnutChartLabels,
      datasets: [{
        label: 'Daily Technology usage',
        data: this.intereschartData,
        duration: 2000,
        easing: 'easeInQuart',
        backgroundColor: this.intereschartColors,
        hoverBackgroundColor: this.doughnutChartBorderColors,
        borderColor: this.doughnutChartBorderColors,
        borderWidth: 1,
      }]
    }
  }

  getmorachartData() {
    return {
      labels: this.doughnutChartLabels,
      datasets: [{
        label: 'Daily Technology usage',
        data: this.morachartData,
        duration: 2000,
        easing: 'easeInQuart',
        backgroundColor: this.morachartColors,
        hoverBackgroundColor: this.doughnutChartBorderColors,
        borderColor: this.doughnutChartBorderColors,
        borderWidth: 1,
      }]
    }
  }

  gettotalchartData() {
    return {
      labels: this.doughnutChartLabels,
      datasets: [{
        label: 'Daily Technology usage',
        data: this.totalchartData,
        duration: 2000,
        easing: 'easeInQuart',
        backgroundColor: this.totalchartColors,
        hoverBackgroundColor: this.doughnutChartBorderColors,
        borderColor: this.doughnutChartBorderColors,
        borderWidth: 1,
      }]
    }
  }

  getpercentchartData() {
    return {
      labels: this.doughnutChartLabels,
      datasets: [{
        label: 'Daily Technology usage',
        data: this.percentchartData,
        duration: 2000,
        easing: 'easeInQuart',
        backgroundColor: this.capitalchartColors,
        hoverBackgroundColor: this.doughnutChartBorderColors,
        borderColor: this.doughnutChartBorderColors,
        borderWidth: 1,
      }]
    }
  }

  prestamosChartData() {
    return {
      labels: this.doughnutChartLabels,
      datasets: [{
        label: 'Daily Technology usage',
        data: this.prestamoschartData,
        duration: 2000,
        easing: 'easeInQuart',
        backgroundColor: this.percentchartColors,
        hoverBackgroundColor: this.doughnutChartBorderColors,
        borderColor: this.doughnutChartBorderColors,
        borderWidth: 1,
      }]
    }
  }

  prestCapitalChartData() {
    return {
      labels: this.doughnutChartLabels,
      datasets: [{
        label: 'Daily Technology usage',
        data: this.prestCapitalData,
        duration: 2000,
        easing: 'easeInQuart',
        backgroundColor: this.capitalchartColors,
        hoverBackgroundColor: this.doughnutChartBorderColors,
        borderColor: this.doughnutChartBorderColors,
        borderWidth: 1,
      }]
    }
  }

  opts: any = {
    // responsive: false,
    maintainAspectRatio: false,
    cutoutPercentage: 65,
    circumference: Math.PI,
    rotation: -Math.PI,
    legend: {
      display: false,
      position: 'bottom',
      marginTop: 30,
      marginLeft: 70,
      labels: {
        boxWidth: 16,
        fontColor: '#dbdbdb',
        fontSize: 17,
        padding: 20,
        usePointStyle: false
      }
    },
    events: false,
    tooltips: {
      enabled: false,
      pointFormat: '<p>{point.percentage:.1f}%<p>'
    },
    hover: {
      animationDuration: 0
    },
    animation: {
      duration: 500,
      easing: "easeOutQuart",
      onComplete: function () {
        var ctx = this.chart.ctx;
        var see = this.chart.chart.height / this.chart.chart.width * 1.5;
        var cx = this.chart.chart.width * 16 / 32 + 1;
        var cy = this.chartArea.bottom - 10;
        var max = 0;
        var totlaVal = 0;
        var dataCount = 0;
        var put_text = 0;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'bold', Chart.defaults.global.defaultFontFamily);

        this.data.datasets.forEach(dataset => {
          ctx.font = this.chartArea.bottom > 200 ? '23px Default Chart Font' : '12px Default Chart Font';
          for (var i = 0; i < dataset.data.length; i++) {
            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
              total = dataset._meta[Object.keys(dataset._meta)[0]].total,
              mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius) / 2,
              start_angle = model.startAngle,
              end_angle = model.endAngle,
              mid_angle = start_angle + (end_angle - start_angle) / 2;
            var x = mid_radius * Math.cos(mid_angle);
            var y = mid_radius * Math.sin(mid_angle) - 10;
            totlaVal = total;
            dataCount = dataset.data.length;
            ctx.fillStyle = '#262261';
            // if (i == 2 || i == 0) { // Darker text color for lighter background
            //   ctx.fillStyle = '#000000';
            // }
            var percent = (+dataset.data[i] / total * 100 as number).toFixed(1) + "%";
            put_text = dataset.data[0];
            // Display percent in another line, line break doesn't work for fillText
            // ctx.fillText(percent, model.x + x, model.y + y + 10);
            if (max < Math.round(dataset.data[i] / total * 100)) {
              max = Math.round(dataset.data[i] / total * 100);
            }
          }
        });
        ctx.font = this.chartArea.bottom > 200 ? '25px Default Chart Font' : '17px Default Chart Font';
        ctx.fillStyle = '#262261';
        // ctx.fillText((totlaVal / dataCount).toFixed(0), cx, cy);//+ "%"
        // ctx.fillText("$" + (put_text).toFixed(2), cx, cy);
        ctx.font = '12px Default Chart Font';
        // ctx.fillText("0", 15, this.chartArea.bottom - 5);
        // ctx.fillText("100", this.chart.chart.width - 15, this.chartArea.bottom - 5);
      }
    }
  };
}
