import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'carryFest-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public currentStep: number = 1;
  public signUpForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    document.documentElement.style.setProperty('--lineWidth', `0%`);
  }

  private createForm(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['',  [Validators.required, Validators.email]],
      password: ['',  [Validators.required]],
      firstName: ['',  [Validators.required, Validators.email]],
      lastName: ['',  [Validators.required]],
      serviceName: ['',  [Validators.required]],
      serviceType: ['',  [Validators.required]],
      serviceLocation: ['',  [Validators.required]],
      phoneNumber: ['',  [Validators.required]],
    });
  }

  setStep(direction: boolean) {
    direction ? this.currentStep++ : this.currentStep--;
    console.log(document.documentElement.style.getPropertyValue('--lineWidth'));
    console.log(Number.parseInt(document.documentElement.style.getPropertyValue('--lineWidth')));
    const prevValue = Number.parseInt(document.documentElement.style.getPropertyValue('--lineWidth'));
    const percent = (50 * (this.currentStep - 1));
    for (let i = prevValue; i !== percent; prevValue > percent ? i-- : i++ ) {
      this.delay(300);
      document.documentElement.style.setProperty('--lineWidth', `${i}%`);
    }
  }
  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
