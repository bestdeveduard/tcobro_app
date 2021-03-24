import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanFormPageRoutingModule } from './loan-form-routing.module';
import { NgSelect2Module } from 'ng-select2';
import { LoanFormPage } from './loan-form.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    LoanFormPageRoutingModule,
    NgSelect2Module
  ],
  declarations: [LoanFormPage]
})
export class LoanFormPageModule {}
