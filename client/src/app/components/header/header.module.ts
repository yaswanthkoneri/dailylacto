import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponentModule {}
