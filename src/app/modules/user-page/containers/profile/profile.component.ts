import {Component, Input, OnInit} from '@angular/core';
import {FirebaseService} from '../../../../services/firebase.service';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'carryFest-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public imageList;
  public keys;
  constructor(private fireBaseService: FirebaseService, private auth: AuthService) {
    this.auth._authData.subscribe((user) => {
      this.imageList = user.photos;
      this.keys = Object.keys(this.imageList);
    });
  }

  ngOnInit() {
  }
  public getImage(event) {
    console.log(event);
    this.fireBaseService.addUserImage(event);
  }
}
