import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetStartedComponent } from './get-started.component';
import {Routes, RouterModule} from '@angular/router';
import { SignInComponent } from './containers/sign-in/sign-in.component';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import { StartupService } from './services/startup.service';
import {LayoutModule} from '../../_layout/layout.module';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {SharedModule} from '../../_shared/shared.module';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';

const routes: Routes = [
  { path: 'startup', component: GetStartedComponent, children: [
    { path: '', redirectTo: 'sign-in', pathMatch: 'full'},
    { path: 'sign-in', component: SignInComponent},
    { path: 'sign-up', component: SignUpComponent},
  ]}
];

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    GooglePlaceModule,
    SharedModule
  ],
  declarations: [GetStartedComponent, SignInComponent, SignUpComponent],
  bootstrap: [GetStartedComponent],
  providers: [StartupService],
  exports: [
    RouterModule
  ]
})
export class GetStartedModule {
  constructor() {
    console.log('getStarted');
  }
}
