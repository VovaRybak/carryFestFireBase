import {Component, OnInit} from '@angular/core';
import {FirebaseService} from './services/firebase.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoaderSpinnerService} from './loader-spinner/loader-spinner.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public eventList;
  public usersList;
  public eventListKeys;
  public uploadedFile;
  public userAccountForm: FormGroup;
  public userAuthForm: FormGroup;
  public userSignUpForm: FormGroup;
  public imageInput;
  public uploadedPhoto;
  public uID;
  public fileImage;
  public user;

  constructor(private firebaseService: FirebaseService, private fb: FormBuilder, private spinner: LoaderSpinnerService, private authService: AuthService) {}
  ngOnInit() {
    this.listUsers();
    this.listEvents();
    this.userAuthForm = this.fb.group({
      email: ['',  [Validators.required]],
      password: ['',  [Validators.required]],
    });
    this.userSignUpForm = this.fb.group({
      email: ['',  [Validators.required]],
      password: ['',  [Validators.required]],
      repeatPassword: ['',  [Validators.required]],
    });
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
  getUserInfoById() {
    this.firebaseService.getUserByID(this.uID).on('value', snapshot => {
      const arr = snapshot.val();
      const key = Object.keys(arr);
      this.user = arr[key[0]];
    });
  }
  onChangeImage(event) {
    this.fileImage = event.target.files[0];
    this.imageInput = event.target;
    const reader = new FileReader();
    reader.onload = (events: any) => {
      this.uploadedPhoto = events.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
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
  removePhoto(event) {
    this.imageInput.value = '';
    this.uploadedPhoto = undefined;
  }
  authorize() {
    this.authService.login({ email: this.userAuthForm.get('email').value, password: this.userAuthForm.get('password').value})
      .then((result) => {
        this.uID = result.user.uid;
        this.getUserInfoById();
      });
  }
  register() {
    this.authService.doRegister({ email: this.userSignUpForm.get('email').value, password: this.userSignUpForm.get('password').value})
      .then((result) => {
        this.uID = result.user.uid;
        this.firebaseService.putUsersInfo({email: this.userSignUpForm.get('email').value, userID: result.user.uid}, this.fileImage);
      });
  }
  listEvents() {
    this.spinner.show();
    this.firebaseService.getEvents()
      .subscribe((events) => {
          this.eventList = events;
        if (events) {
          this.eventListKeys = Object.keys(events);
        } else {
          this.eventListKeys = [];
        }
        this.spinner.hide();
      }
    );
  }
  listUsers() {
    this.spinner.show();
    this.firebaseService.getUsersInfo()
      .subscribe((users) => {
          this.usersList = users;
        if (users) {
          this.eventListKeys = Object.keys(users);
        } else {
          this.eventListKeys = [];
        }
        this.spinner.hide();
      }
    );
  }
}
