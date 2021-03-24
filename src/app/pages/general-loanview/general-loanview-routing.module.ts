import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralLoanviewPage } from './general-loanview.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralLoanviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralLoanviewPageRoutingModule {}
