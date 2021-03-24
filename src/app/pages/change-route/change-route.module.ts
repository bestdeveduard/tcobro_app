import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeRoutePageRoutingModule } from './change-route-routing.module';

import { ChangeRoutePage } from './change-route.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TranslateModule,
    ChangeRoutePageRoutingModule
  ],
  declarations: [ChangeRoutePage]
})
export class ChangeRoutePageModule {}
