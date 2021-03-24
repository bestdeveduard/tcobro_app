import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-printer-list',
  templateUrl: './printer-list.page.html',
  styleUrls: ['./printer-list.page.scss'],
})
export class PrinterListPage implements OnInit {

  printList: string[];

  b_device: string;

  data: any;

  constructor(
    private navParam: NavParams,
    private modalCtrl: ModalController,
    private storage: Storage
  ) {
    this.printList = navParam.get('list');
   }

  async ngOnInit() {
    var nn = await this.storage.get('print_name');
    var mm = await this.storage.get('mac_address');
    this.b_device = nn + '/' + mm;
  }

  changeDevice(event) {
    var val = event.target.value;
    console.log('device == ', val)
    this.b_device = val
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async save() {
    var valu = this.b_device.split('/');
    await this.storage.set('print_name', valu[0]);
    await this.storage.set('mac_address', valu[1]);
    this.modalCtrl.dismiss({ device_name: valu[0], mac_address: valu[1] }, 'selected');
  }

}
