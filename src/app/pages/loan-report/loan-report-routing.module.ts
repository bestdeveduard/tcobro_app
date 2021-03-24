import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanReportPage } from './loan-report.page';

const routes: Routes = [
  {
    path: '',
    component: LoanReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanReportPageRoutingModule {}
