import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'carryFest-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  public profileInfo;
  constructor(private route: ActivatedRoute, private auth: AuthService) {
    if (this.route.snapshot.routeConfig.path === 'me') {
      this.auth._authData
        .subscribe((authData) => this.profileInfo = authData);
      console.log(this.profileInfo);
      console.log(JSON.parse(localStorage.getItem('userInfo')));
    }
  }

  ngOnInit() {
  }

}
