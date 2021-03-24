import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralReportPageRoutingModule } from './general-report-routing.module';

import { GeneralReportPage } from './general-report.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    GeneralReportPageRoutingModule
  ],
  declarations: [GeneralReportPage]
})
export class GeneralReportPageModule {}
