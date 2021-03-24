import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RouteViewPageRoutingModule } from './route-view-routing.module';
import { RouteViewPage } from './route-view.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    SuperTabsModule,
    RouteViewPageRoutingModule
  ],
  declarations: [RouteViewPage]
})
export class RouteViewPageModule {}
