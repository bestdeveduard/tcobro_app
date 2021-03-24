import { ApplicationRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/commonService';
import { CalendarPage } from '../calendar/calendar.page';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.page.html',
  styleUrls: ['./loan-form.page.scss'],
})
export class LoanFormPage implements OnInit {

  release_date: string;
  release_date1: string;
  form: FormGroup;
  clients = []
  client_id: any = '';
  uploadFiles
  file_type
  file_name

  constructor(
    public navCtrl: NavController,
    private datePicker: DatePicker,
    private modalCtrl: ModalController,
    private applicationRef: ApplicationRef,
    private api: ApiService,
    public comService: CommonService,
    private storage: Storage,
    private route: ActivatedRoute
  ) {
    route.queryParams.subscribe(params => {
      const { customer, ...remainParams } = params
      if (customer) this.client_id = customer.id
    });
    this.form = new FormGroup({
      borrower_id: new FormControl(this.client_id, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      repayment_cycle: new FormControl('daily', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      loan_duration: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      principal: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      interest_rate: new FormControl(comService.selected_route.default_interest_rate, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      interest_method: new FormControl('flat_rate', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      first_payment_date: new FormControl(this.release_date, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      penalty_status: new FormControl('1', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      day_payment: new FormControl('1', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      files: new FormControl(this.uploadFiles, {
        updateOn: 'change'
      })
    });
  }

  async ngOnInit() {
    this.getClients()
    this.file_name = await this.comService.getTranslationWord('choose_file')
  }

  async getClients() {
    this.clients = []
    await this.comService.presentLoading()
    if (this.comService.networkStatus == 'off') {
      this.clients = await this.storage.get(`borrowers_name_${this.comService.currentUser.business_id}`);
      this.clients.forEach(ele => {
        if (this.client_id == '') this.client_id = ele.id
      })
      this.comService.hideLoading()
      this.comService.presentToast("You can't use this action without network")
    } else {
      this.api.requestPostData('getBorrowers', {user_id: this.comService.currentUser.id, business_id: this.comService.currentUser.business_id}).subscribe(result => {
        this.comService.hideLoading()
        console.log('clients == ', result)
        if (result.status == 200) {
          result.borrowers.forEach(element => {
            var sub_com = {
              id: element.id,
              text: `${element.first_name} ${element.last_name ? element.last_name : ''}`
            }
            this.clients.push(sub_com);
            if (this.client_id == '') this.client_id = element.id
          });
          this.storage.set(`borrowers_name_${this.comService.currentUser.business_id}`, this.clients);
        }
      })
    }
  }

  changeClient($event) {
    console.log('event == ', $event);
  }

  async submitForm() {
    if (new Date(this.release_date + ' ' + '00:00:00') < new Date()) {
      this.comService.presentAlert("Error", "First payment date can't less than now.");
      return;
    }   
    
    let fmData = new FormData();
    fmData.append('borrower_id', this.form.value.borrower_id)
    fmData.append('repayment_cycle', this.form.value.repayment_cycle)
    fmData.append('loan_duration', this.form.value.loan_duration)
    fmData.append('principal', this.form.value.principal)
    fmData.append('interest_rate', this.form.value.interest_rate)
    fmData.append('interest_method', this.form.value.interest_method)
    fmData.append('first_payment_date', this.release_date)
    fmData.append('penalty_status', this.form.value.penalty_status)
    fmData.append('day_payment', this.form.value.day_payment)
    fmData.append('loan_product_id', this.comService.route_id)
    fmData.append('user_id', this.comService.currentUser.id)
    fmData.append('business_id', this.comService.currentUser.business_id)
    fmData.append('interest_period', "month")//this.comService.selected_route.interest_period
    fmData.append('loan_duration_type', "month")//this.comService.selected_route.default_loan_duration_type
    fmData.append('decimal_places', this.comService.selected_route.decimal_places)
    fmData.append('grace_on_interest_charged', this.comService.selected_route.grace_on_interest_charged)
    if (this.uploadFiles) {
      fmData.append('files', this.uploadFiles);
      fmData.append('file_type', this.file_type);
    }
    console.log('form data == ', fmData.get('first_payment_date'));

    // var sendData = {
    //   borrower_id: this.form.value.borrower_id,
    //   repayment_cycle: this.form.value.repayment_cycle,
    //   loan_duration: this.form.value.loan_duration,
    //   principal: this.form.value.principal,
    //   interest_rate: this.form.value.interest_rate,
    //   interest_method: this.form.value.interest_method,
    //   first_payment_date: this.release_date,
    //   penalty_status: this.form.value.penalty_status,
    //   day_payment: this.form.value.day_payment,
    //   loan_product_id: this.comService.route_id,
    //   user_id: this.comService.currentUser.id,
    //   business_id: this.comService.currentUser.business_id,
    //   interest_period: this.comService.selected_route.interest_period,
    //   loan_duration_type: this.comService.selected_route.default_loan_duration_type,
    //   decimal_places: this.comService.selected_route.decimal_places,
    //   grace_on_interest_charged: this.comService.selected_route.grace_on_interest_charged
    // }
    // if (this.uploadFiles) {
    //   sendData['files'] = this.uploadFiles;
    //   sendData['file_type'] = this.file_type
    // }    

    await this.comService.presentLoading()
    this.api.makeNewLoan(fmData).then(result => {
      this.comService.hideLoading();
      console.log('result == ', result);
      this.comService.presentToast(result.message);
      if (result.status == 200) this.navCtrl.back();
    }).catch(error => {
      this.comService.hideLoading();
      console.log('error11 == ', error);
      this.comService.presentToast(error.error.message);
    })
  }

  getFiles(event) {
    let self = this
    let files = event.target.files[0];
    this.file_type = files.type;
    this.file_name = files.name;
    console.log('file == ', files.type, ', ', files.name);
    this.uploadFiles = files;
    // let reader = new FileReader();
    // reader.onload = function (e: any) {
    //     let fileData = e.target.result;
    //     console.log(fileData);
    //     self.uploadFiles = fileData;
    // };
    // reader.readAsDataURL(files);
  }

  gotoRouteView() {
    this.navCtrl.navigateRoot('tabs/route-view')
  }  

  async selectDateFunc() {
    let modal = await this.modalCtrl.create({
      component: CalendarPage,
      backdropDismiss: true,
      cssClass: "calendar_modal"
    });
    modal.onDidDismiss().then(data => {
      if (data.role == "select-date") {
        this.release_date = data.data.realDate
        this.release_date1 = data.data.displayDate
        this.form.value.first_payment_date = this.release_date
        console.log('data == ', this.form.value.first_payment_date)
        this.applicationRef.tick()  
      }
    });
    modal.present();    
  }

}
