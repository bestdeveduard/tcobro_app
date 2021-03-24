import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuViewPage } from './menu-view.page';

const routes: Routes = [
  {
    path: '',
    component: MenuViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuViewPageRoutingModule {}
