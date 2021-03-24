import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanFormPage } from './loan-form.page';

const routes: Routes = [
  {
    path: '',
    component: LoanFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanFormPageRoutingModule {}
