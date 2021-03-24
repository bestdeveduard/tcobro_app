import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';
import { CalendarModule } from 'ion2-calendar';
import { NgCalendarModule  } from 'ionic2-calendar';
import { CalendarPage } from './calendar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    CalendarModule,
    NgCalendarModule
  ],
  declarations: [CalendarPage]
})
export class CalendarPageModule {}
