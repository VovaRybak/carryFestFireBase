import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {FilesOperationsService} from '../../../../services/files-operations.service';
import {StartupService} from '../../services/startup.service';

@Component({
  selector: 'carryFest-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public currentStep: number = 1;
  public signUpForm: FormGroup;
  private locationName: string;

  constructor(private formBuilder: FormBuilder, private startupService: StartupService) {
    this.createForm();
  }

  ngOnInit() {
    document.documentElement.style.setProperty('--lineWidth', `0%`);
  }

  private createForm(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['',  [Validators.required, Validators.email]],
      password: ['',  [Validators.required]],
      firstName: ['',  [Validators.required]],
      lastName: ['',  [Validators.required]],
      serviceName: ['',  [Validators.required]],
      serviceType: ['',  [Validators.required]],
      serviceLocation: ['',  [Validators.required]],
      phoneNumber: ['',  [Validators.required]],
      photo: ['',  [Validators.required]],
    });
  }

  setStep(direction: boolean) {
    direction ? this.currentStep++ : this.currentStep--;
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

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  public handleAddressChange(address: Address) {
    this.locationName = address.name;
  }

  getImage(event) {
    this.signUpForm.controls['photo'].setValue(event);
  }

  public sendUserData(): void {
    const formValue = this.signUpForm.getRawValue();
    console.log(formValue);
    this.startupService.signUp(formValue);
  }
}
