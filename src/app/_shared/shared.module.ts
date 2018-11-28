import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageUploadUserPageComponent } from './image-upload-user-page/image-upload-user-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImageUploadComponent, ImageUploadUserPageComponent],
  exports: [ImageUploadComponent, ImageUploadUserPageComponent]
})
export class SharedModule { }
