import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page.component';
import { SettingsComponent } from './containers/settings/settings.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { PortfolioComponent } from './containers/portfolio/portfolio.component';
import {RouterModule, Routes} from '@angular/router';
import {LayoutModule} from '../../_layout/layout.module';
import {FirebaseService} from '../../services/firebase.service';

const routes: Routes = [
  { path: 'me', component: UserPageComponent, children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full'},
      { path: 'profile', component: ProfileComponent},
      { path: 'portfolio', component: PortfolioComponent},
      { path: 'settings', component: SettingsComponent},
    ]}
];

@NgModule({
  imports: [
    LayoutModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserPageComponent, SettingsComponent, ProfileComponent, PortfolioComponent],
  exports: [RouterModule]
})
export class UserPageModule {
  constructor(private firebaseService: FirebaseService) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.firebaseService.getUserByID(userInfo.userID).on('value', (snapshot) => {
      const arr = snapshot.val();
      const key = Object.keys(arr);
      localStorage.setItem('userInfo', JSON.stringify(Object.assign(arr[key[0]], JSON.parse(localStorage.getItem('userInfo')))));
      sessionStorage.setItem('userInfo', JSON.stringify(Object.assign(arr[key[0]], JSON.parse(sessionStorage.getItem('userInfo')))));
    });
  }
}
