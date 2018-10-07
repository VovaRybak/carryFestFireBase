import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatOptionModule, MatSelectModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    RouterModule
  ],
  declarations: [MainHeaderComponent],
  exports: [MainHeaderComponent]
})
export class LayoutModule { }
