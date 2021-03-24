import { ApplicationRef, Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PrinterListPage } from 'src/app/modals/printer-list/printer-list.page';
import { CommonService } from 'src/services/commonService';

declare var BTPrinter;

@Component({
  selector: 'app-print-setting',
  templateUrl: './print-setting.page.html',
  styleUrls: ['./print-setting.page.scss'],
})
export class PrintSettingPage implements OnInit {

  enable_bluetooth: boolean;

  device_name: any;
  mac_address: any;

  constructor(
    private storage: Storage,
    public btSerial: BluetoothSerial,
    private comService: CommonService,
    private modalCtrl: ModalController,
    private applicationRef: ApplicationRef,
    private navCtrl: NavController
  ) { }

  async ngOnInit() {
    var name = await this.storage.get('print_name');
    var mac = await this.storage.get('mac_address');
    if (name) this.device_name = name;
    if (mac) this.mac_address = mac
    
    // this.checkBluetoothStatus();
  }

  savePrinter() {
    this.navCtrl.back();
  }

  async checkBluetoothStatus() {
    let self = this;
    BTPrinter.status(function (data) {
      console.log("Success");      
      self.enable_bluetooth = true;
      console.log(data) // bt status: true or false
    }, function (err) {
      console.log("Error");
      self.enable_bluetooth = false;
      console.log(err)
    });
  }  

  showDeviceList() {
    this.checkBluetoothPrinterStatus();
  }

  checkBluetoothPrinterStatus() {    
    let self = this;
    BTPrinter.status(function (data) {
      console.log("Success");      
      self.getBlutoothList();
      console.log(data) // bt status: true or false
    }, function (err) {
      console.log("Error");
      self.comService.presentAlert('ERROR 11 == ', err);
      console.log(err)
    });
  }

  getBlutoothList() {
    let self = this;
    BTPrinter.list(function (data: any[]) {
      console.log("Success 12 == ", data);      
      self.modalCtrl.create({
        component: PrinterListPage,
        componentProps: { list: data }
      }).then(modal => {
        modal.onDidDismiss().then(data => {
          if (data.role == 'selected') {
            self.device_name = data.data.device_name;
            self.mac_address = data.data.mac_address;
          }
          self.applicationRef.tick();
        });
        modal.present();
      });      
    }, function (err) {
      console.log("Error 12 == ", err);
      self.comService.presentAlert('ERROR 12 == ', err);
    });
  }

  async printTestData() {
    var print_data = [];
    var content = {}

    var word = await this.comService.getTranslationWord('app_name')
    content = {
      text: word, size: '11', align: '1'
    }
    print_data.push(content);

    word = await this.comService.getTranslationWord('test_text')
    content = {
      text: word, size: '0', align: '1'
    }
    print_data.push(content);

    this.comService.checkBluetoothPrinterStatus(print_data);
  }

}
