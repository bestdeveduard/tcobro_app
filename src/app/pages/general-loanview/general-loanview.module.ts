import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralLoanviewPageRoutingModule } from './general-loanview-routing.module';

import { GeneralLoanviewPage } from './general-loanview.page';
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
    GeneralLoanviewPageRoutingModule
  ],
  declarations: [GeneralLoanviewPage]
})
export class GeneralLoanviewPageModule {}
