import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralReportPage } from './general-report.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralReportPageRoutingModule {}
