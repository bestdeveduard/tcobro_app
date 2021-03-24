import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrintSettingPageRoutingModule } from './print-setting-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PrintSettingPage } from './print-setting.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrintSettingPageRoutingModule,
    TranslateModule,
    ComponentsModule
  ],
  declarations: [PrintSettingPage]
})
export class PrintSettingPageModule {}
