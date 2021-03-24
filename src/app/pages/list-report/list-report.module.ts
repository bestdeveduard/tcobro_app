import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListReportPageRoutingModule } from './list-report-routing.module';

import { ListReportPage } from './list-report.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    ListReportPageRoutingModule
  ],
  declarations: [ListReportPage]
})
export class ListReportPageModule {}
