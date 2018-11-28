import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UserInfoService} from './services/user-info.service';

@Component({
  selector: 'carryFest-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  public profileInfo;
  constructor(private route: ActivatedRoute, private auth: AuthService, private userInfoService: UserInfoService) {
    if (this.route.snapshot.routeConfig.path === 'me') {
      this.userInfoService.getUserRefference().once('value', value => {
        const querry = value.val();
        const keys = Object.keys(querry);
        this.profileInfo = querry[keys[0]];
      });
    }

  }

  ngOnInit() {
  }

}
