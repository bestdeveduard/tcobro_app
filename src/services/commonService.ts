import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { TranslateService } from '@ngx-translate/core';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Storage } from '@ionic/storage';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';

declare var BTPrinter;

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  currentUser: any;
  userRole: string;
  route_id;
  route_name: any = '';
  selected_route;
  countries = []

  loading: any;  

  networkStatus: string = 'on';
  printDeviceName: any;
  print_data = []

  constructor(
    public alertController: AlertController,
    public loadingctrl: LoadingController, public toastController: ToastController,
    public btSerial: BluetoothSerial,
    private translate: TranslateService,
    private nativeGeocoder: NativeGeocoder,
    private storage: Storage
  ) {

  }

  async presentAlert(head, msg) {
    const alert = await this.alertController.create({
      header: head,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500,
      position: 'bottom',
      cssClass: 'custom-toast'
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingctrl.create({
      spinner: null,
      duration: 5500,
      message: `<ion-spinner name="bubbles"></ion-spinner>`,
      mode: 'ios'
    });
    await this.loading.present();
  }

  async autoHideLoading() {
    this.loading = await this.loadingctrl.create({
      spinner: 'circles',
      duration: 400,
      message: '',
      mode: 'md'
    });
    await this.loading.present();
  }

  async hideLoading() {
    this.loadingctrl.getTop().then(() => {
      this.loadingctrl.dismiss();
    });
  }

  getTranslationWord(word) {
    return new Promise<string>((resolve, reject) => {
      this.translate.get(word).subscribe(res => {
        console.log('====== ', res);
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  getAddressFromCoords(lattitude, longitude): Promise<any> {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    return new Promise<any>((resolve, reject) => {
      this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        var source = "";
        let responseAddress = [];
        console.log("start result === : ", result)
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0) responseAddress.push(value);
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          source += value + ", ";
        }
        source = source.slice(0, -2);
        resolve(source)
      })
      .catch((error: any) => {
        var source = "Address Not Available!";
        reject(source);
      });
    });    
  }

  ///////////////////////////////     Start      ////////////////////////////////

  async checkBluetoothPrinterStatus(print_data = []) {    
    this.print_data = print_data;    
    let self = this;
    BTPrinter.status(function (data) {
      console.log("Success");      
      self.getBlutoothList();
      console.log(data) // bt status: true or false
    }, function (err) {
      console.log("Error");
      self.presentAlert('ERROR 6 == ', err);
      console.log(err)
    });
  }

  async getBlutoothList() {
    let self = this;

    var printer_name = await this.storage.get('print_name');

    if (!printer_name || printer_name == null || printer_name == '' || printer_name == undefined) {
      var word = await this.getTranslationWord('not_configure')
      this.presentAlert('Sorry', word)
    } else {
      this.printDeviceName = printer_name;
      this.printerConnect(this.printDeviceName);
    }    
  }

  printerConnect(printer) {
    let self = this
    BTPrinter.connect(function (data) {
      console.log("Success 2 == ", data);
      self.printingTextData();
    }, function (err) {
      console.log("Error 2 == ", err);
      self.presentAlert('ERROR 2 = #' + printer, err);
    }, printer);
  }

  async printingTextData(index = 0) {
    if (index == this.print_data.length) {
      var word = await this.getTranslationWord('print_success')
      this.presentToast(word);
      this.clearButterData();
      this.disconnect();
      return;
    }
    let self = this
    BTPrinter.printTextSizeAlign(function (data) {
      console.log("Success 3 == ", data);
      index++;
      self.printingTextData(index);
    }, function (err) {
      console.log("Error 3 == ", err);
      self.presentAlert('ERROR 3 == ', err);
    }, this.print_data[index].text, this.print_data[index].size, this.print_data[index].align);//string, size, align
  }

  disconnect() {
    let self = this
    BTPrinter.disconnect(function (data) {
      console.log("Success");
      console.log(data)
    }, function (err) {
      console.log("Error");
      self.presentAlert('ERROR 4 == ', err);
      console.log(err)
    }, self.printDeviceName);
  }

  print() {
    let self = this
    BTPrinter.printBase64(function (data) {
      console.log("Success 3 == ", data);
      self.presentToast('Printed successfully!');
      self.disconnect()
    }, function (err) {
      console.log("Error 3 == ", err);
      self.presentAlert('ERROR', err);
    }, 'base64 string', '0');//base64 string, align
  }

  async clearButterData() {
    await this.btSerial.clear();
  }
}