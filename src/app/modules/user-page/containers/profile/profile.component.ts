import {Component, Input, OnInit} from '@angular/core';
import {FirebaseService} from '../../../../services/firebase.service';
import {AuthService} from '../../../../services/auth.service';
import {UserInfoService} from '../../services/user-info.service';
import {skipWhile} from 'rxjs/operators';

@Component({
  selector: 'carryFest-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public imageList;
  public keys;
  public selectedImage;
  public uploadedImage;
  constructor(private userInfoService: UserInfoService, private auth: AuthService) {
    this.auth._authData
      .pipe(
        skipWhile(item => !item.photos)
      )
      .subscribe((user) => {
        if (user && user.photos) {
          this.imageList = user.photos;
          this.keys = Object.keys(this.imageList);
        }
    });
  }

  ngOnInit() {
  }
  public getImage(event) {
    this.userInfoService.addUserImage(event)
      .subscribe();
  }
}
