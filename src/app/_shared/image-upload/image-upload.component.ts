import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
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
  @Output() uploadImage: EventEmitter<any> = new EventEmitter();

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
      this.uploadImage.emit(this.fileImage);
    };
  }
  removePhoto(event) {
    this.imageInput.value = '';
    this.uploadedPhoto = undefined;
  }
}
