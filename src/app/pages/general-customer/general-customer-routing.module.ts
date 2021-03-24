import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralCustomerPage } from './general-customer.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralCustomerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralCustomerPageRoutingModule {}
