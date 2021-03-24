import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerReportPageRoutingModule } from './customer-report-routing.module';

import { CustomerReportPage } from './customer-report.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    TranslateModule,
    IonicModule,
    CustomerReportPageRoutingModule
  ],
  declarations: [CustomerReportPage]
})
export class CustomerReportPageModule {}
