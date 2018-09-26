import {Component, OnInit} from '@angular/core';
import {FirebaseService} from './services/firebase.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public eventList;
  public eventListKeys;
  public uploadedFile;
  public userAccountForm;

  constructor(private firebaseService: FirebaseService, private fb: FormBuilder) {}
  ngOnInit() {
    this.firebaseService.getUsersInfo();
    this.listEvents();
    this.userAccountForm = this.fb.group({
      userName: ['', [Validators.required]],
      userSecondName: ['',  [Validators.required]],
      typeOfActivity: ['',  [Validators.required]],
      email: ['',  [Validators.required]],
      password: ['',  [Validators.required]],
      userLogin: ['',  [Validators.required]],
      profilePhoto: ['']
    });
  }
  onChange(event) {
    this.uploadedFile = event.target.files[0];
  }
  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  deleteEvent(key, imageKey) {
    this.firebaseService.removeEvent(key, imageKey);
  }
  addEvent() {
    this.firebaseService.putEventInfo({'eventDate': this.randomDate(new Date(2017, 0, 1), new Date()).toDateString()}, this.uploadedFile);
  }
  listEvents() {
    this.firebaseService.getEvents()
      .subscribe((events) => {
          this.eventList = events;
        if (events) {
          this.eventListKeys = Object.keys(events);
        } else {
          this.eventListKeys = [];
        }
      }
    );
  }
}
