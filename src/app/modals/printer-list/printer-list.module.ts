import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrinterListPageRoutingModule } from './printer-list-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PrinterListPage } from './printer-list.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrinterListPageRoutingModule,
    TranslateModule,
    ComponentsModule
  ],
  declarations: [PrinterListPage]
})
export class PrinterListPageModule {}
