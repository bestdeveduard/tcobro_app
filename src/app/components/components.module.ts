import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CommonHeaderComponent } from './common-header/common-header.component';
import { SearchSectionComponent } from "./search-section/search-section.component";
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxIonicImageViewerModule,
    IonicModule.forRoot(),
  ],
  declarations: [
    CommonHeaderComponent,
    SearchSectionComponent
  ],
  exports: [
    CommonHeaderComponent,
    SearchSectionComponent
  ],
  entryComponents: [],
})
export class ComponentsModule {}