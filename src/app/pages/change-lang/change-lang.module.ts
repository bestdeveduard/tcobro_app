import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeLangPageRoutingModule } from './change-lang-routing.module';

import { ChangeLangPage } from './change-lang.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    ChangeLangPageRoutingModule
  ],
  declarations: [ChangeLangPage]
})
export class ChangeLangPageModule {}
