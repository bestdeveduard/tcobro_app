import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanReportPageRoutingModule } from './loan-report-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { LoanReportPage } from './loan-report.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    LoanReportPageRoutingModule
  ],
  declarations: [LoanReportPage]
})
export class LoanReportPageModule {}
