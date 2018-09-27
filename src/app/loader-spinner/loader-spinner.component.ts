import { Component, OnInit } from '@angular/core';
import {LoaderSpinnerService} from './loader-spinner.service';

@Component({
  selector: 'carryFest-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.scss']
})
export class LoaderSpinnerComponent implements OnInit {

  public isLoading: boolean;
  constructor(private spinnerService: LoaderSpinnerService) {
  }

  ngOnInit() {
    this.spinnerService.spinnerTrigger$.subscribe((trigger: boolean) => {
      this.isLoading = trigger;
    });
  }

}
