import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class LoaderSpinnerService {
  public spinnerTrigger$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  show(): void {
    this.spinnerTrigger$.next(true);
  }

  hide(): void {
    this.spinnerTrigger$.next(false);
  }
}
