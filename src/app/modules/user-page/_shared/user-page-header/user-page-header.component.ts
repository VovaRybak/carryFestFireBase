import {Component, Input, OnInit} from '@angular/core';
import {ServiceTypes} from '../../../../enums/service-types.enum';

@Component({
  selector: 'carryFest-user-page-header',
  templateUrl: './user-page-header.component.html',
  styleUrls: ['./user-page-header.component.scss']
})
export class UserPageHeaderComponent implements OnInit {
  @Input() profile;
  public serviceList;
  constructor() {
    this.serviceList = ServiceTypes;
  }

  ngOnInit() {
  }

}
