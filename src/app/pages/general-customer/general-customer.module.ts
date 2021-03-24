import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralCustomerPageRoutingModule } from './general-customer-routing.module';

import { GeneralCustomerPage } from './general-customer.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    SuperTabsModule,
    GeneralCustomerPageRoutingModule
  ],
  declarations: [GeneralCustomerPage]
})
export class GeneralCustomerPageModule {}
