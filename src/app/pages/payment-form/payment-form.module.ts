import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentFormPageRoutingModule } from './payment-form-routing.module';

import { PaymentFormPage } from './payment-form.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    TranslateModule,
    IonicModule,
    PaymentFormPageRoutingModule
  ],
  declarations: [PaymentFormPage]
})
export class PaymentFormPageModule {}
