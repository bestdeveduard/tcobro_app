import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/services/api.service';
import { CommonService } from 'src/services/commonService';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.page.html',
  styleUrls: ['./customer-form.page.scss'],
})
export class CustomerFormPage implements OnInit {

  countries: any = []

  form: FormGroup;
  latlng;

  type = "new";
  customerData;

  constructor(
    public navCtrl: NavController,
    private api: ApiService,
    public comService: CommonService,
    private geolocation: Geolocation,
    private router: ActivatedRoute,
    private storage: Storage
  ) {
    this.initForm();
    this.router.queryParams.subscribe(params => {
      console.log('params == ', params)
      const { customer, ...otherParam } = params
      if (customer) {
        this.customerData = customer;
        this.type = "edit";
        this.initFormFromCustomer(this.customerData)
      }
    }, error => {
      console.log('param error == ', error);
    })
  }

  ionViewWillEnter() {
    this.countries = this.comService.countries
  }

  ionViewWillLeave() {
    this.initForm();
    this.type = "new";    
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', {
        updateOn: 'change'
      }),
      first_name: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      unique_number: new FormControl('', {
        updateOn: 'change'
      }),
      country_id: new FormControl('61', {
        updateOn: 'change'
      }),
      address: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      mobile: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(8)]
      }),
      phone: new FormControl('', {
        updateOn: 'change'
      }),
      working_status: new FormControl('Employee', {
        updateOn: 'change'
      }),
      business_name: new FormControl('', {
        updateOn: 'change'
      }),
      working_time: new FormControl('', {
        updateOn: 'change'
      }),
      referencia_1: new FormControl('', {
        updateOn: 'change'
      }),
      notes: new FormControl('', {
        updateOn: 'change'
      }),
      gender: new FormControl('male', {
        updateOn: 'change'
      }),
      title: new FormControl('Mr', {
        updateOn: 'change'
      }),
      user_id: new FormControl(this.comService.currentUser.id, {
        updateOn: 'change'
      }),
      business_id: new FormControl(this.comService.currentUser.business_id, {
        updateOn: 'change'
      })
    });
  }

  initFormFromCustomer(customerData) {
    this.form = new FormGroup({
      email: new FormControl(customerData.email, {
        updateOn: 'change'
      }),
      first_name: new FormControl(customerData.first_name, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      unique_number: new FormControl(customerData.unique_number, {
        updateOn: 'change'
      }),
      country_id: new FormControl(customerData.country_id, {
        updateOn: 'change'
      }),
      address: new FormControl(customerData.address, {
        updateOn: 'change'
      }),
      mobile: new FormControl(customerData.mobile, {
        updateOn: 'change'
      }),
      phone: new FormControl(customerData.phone, {
        updateOn: 'change'
      }),
      working_status: new FormControl(customerData.working_status, {
        updateOn: 'change'
      }),
      business_name: new FormControl(customerData.business_name, {
        updateOn: 'change'
      }),
      working_time: new FormControl(customerData.working_time, {
        updateOn: 'change'
      }),
      referencia_1: new FormControl(customerData.referencia_1, {
        updateOn: 'change'
      }),
      notes: new FormControl(customerData.notes, {
        updateOn: 'change'
      }),
      gender: new FormControl('male', {
        updateOn: 'change'
      }),
      title: new FormControl('Mr', {
        updateOn: 'change'
      }),
      user_id: new FormControl(this.comService.currentUser.id, {
        updateOn: 'change'
      }),
      business_id: new FormControl(this.comService.currentUser.business_id, {
        updateOn: 'change'
      })
    });
  }

  ngOnInit() {    
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latlng = resp.coords.latitude + ',' + resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
      this.latlng = '';
    });
  }

  async submit(data) {
    let sendData: any = data;
    sendData['geolocation'] = this.latlng;
    console.log('sendData == ', sendData)
    if (this.comService.networkStatus == 'off') {
      this.comService.presentToast("You can't do this action without network");
      return;
    }
    await this.comService.presentLoading()
    if (this.type == "edit") {
      sendData['customer_id'] = this.customerData.id;
      this.api.requestPostData('updateCustomer', sendData).subscribe(result => {
        this.comService.hideLoading()
        console.log('result == ', result);
        if (result.status == 200) {
          this.comService.presentToast("Success!");
          this.gotoCustomerReport()
        } else {
          this.comService.presentToast(result.msg.email[0]);
        }
      }, error => {
        this.comService.hideLoading()
        console.log('error == ', error);
      });
    } else {
      this.api.requestPostData('register', sendData).subscribe(result => {
        this.comService.hideLoading()
        console.log('result == ', result);
        if (result.status == 200) {
          this.comService.presentToast("Success!");
          this.gotoCustomerReport()
        } else {
          this.comService.presentToast(result.msg.email[0]);
        }
      }, error => {
        this.comService.hideLoading()
        console.log('error == ', error);
      });
    }    
  }

  gotoCustomerReport() {    
    this.navCtrl.navigateBack('tabs/customer-report');
  }

}
