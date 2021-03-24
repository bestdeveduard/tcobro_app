import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrintSettingPage } from './print-setting.page';

const routes: Routes = [
  {
    path: '',
    component: PrintSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintSettingPageRoutingModule {}
