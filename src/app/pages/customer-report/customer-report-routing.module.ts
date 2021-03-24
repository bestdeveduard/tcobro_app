import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerReportPage } from './customer-report.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerReportPageRoutingModule {}
