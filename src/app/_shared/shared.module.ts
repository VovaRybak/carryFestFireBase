import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload/image-upload.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImageUploadComponent],
  exports: [ImageUploadComponent]
})
export class SharedModule { }
