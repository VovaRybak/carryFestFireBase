import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'carryFest-image-upload-user-page',
  templateUrl: './image-upload-user-page.component.html',
  styleUrls: ['./image-upload-user-page.component.scss']
})
export class ImageUploadUserPageComponent implements OnInit {

  @Input() formControl: FormControl;
  public fileImage;
  @Input() imageInput;
  @Input() uploadedPhoto;
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
      this.uploadImage.emit(this.fileImage);
      this.imageInput.value = '';
    };
  }
}
