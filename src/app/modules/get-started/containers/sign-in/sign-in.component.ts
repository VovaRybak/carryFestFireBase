import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthData} from '../../interfaces/auth-data';
import {StartupService} from '../../services/startup.service';
import {Router} from '@angular/router';

@Component({
  selector: 'carryFest-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private startupService: StartupService, private router: Router) {}

  ngOnInit() {
    this.createForm();
  }
  private createForm(): void {
    this.signInForm = this.formBuilder.group({
      email: ['',  [Validators.required, Validators.email]],
      password: ['',  [Validators.required]],
    });
  }
  private tryToLogin(): any {
    if (this.signInForm.valid) {
      const authData: AuthData = this.signInForm.getRawValue();
      this.startupService.signInWithEmailAndPassword(authData)
        .subscribe((authResult) => {
          if (authResult) {
            this.router.navigate(['me/profile']);
          }
        });
    }
  }
}
