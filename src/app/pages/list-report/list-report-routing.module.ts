import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListReportPage } from './list-report.page';

const routes: Routes = [
  {
    path: '',
    component: ListReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListReportPageRoutingModule {}
