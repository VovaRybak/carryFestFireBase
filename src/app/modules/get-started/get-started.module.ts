import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetStartedComponent } from './get-started.component';
import {Routes, RouterModule} from '@angular/router';
import { SignInComponent } from './containers/sign-in/sign-in.component';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import {LayoutModule} from '../../_layout/layout.module';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {StartupService} from './services/startup.service';

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
    MatInputModule
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
