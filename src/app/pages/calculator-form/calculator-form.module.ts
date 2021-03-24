import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculatorFormPageRoutingModule } from './calculator-form-routing.module';

import { CalculatorFormPage } from './calculator-form.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    CalculatorFormPageRoutingModule
  ],
  declarations: [CalculatorFormPage]
})
export class CalculatorFormPageModule {}
