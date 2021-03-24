import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculatorFormPage } from './calculator-form.page';

const routes: Routes = [
  {
    path: '',
    component: CalculatorFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculatorFormPageRoutingModule {}
