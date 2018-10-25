import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'carryFest-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Input() formControl: FormControl;
  public fileImage;
  public imageInput;
  public uploadedPhoto;

  constructor() { }

  ngOnInit() {
  }

  onChangeImage(event) {
    const reader = new FileReader();
    this.fileImage = event.target.files[0];
    this.imageInput = event.target;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (events: any) => {
      this.uploadedPhoto = events.target.result;
    };
  }
  removePhoto(event) {
    this.imageInput.value = '';
    this.uploadedPhoto = undefined;
  }
}
