import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page.component';
import { SettingsComponent } from './containers/settings/settings.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { PortfolioComponent } from './containers/portfolio/portfolio.component';
import {RouterModule, Routes} from '@angular/router';
import {LayoutModule} from '../../_layout/layout.module';
import {FirebaseService} from '../../services/firebase.service';
import { UserPageHeaderComponent } from './_shared/user-page-header/user-page-header.component';
import {TranslateModule} from '@ngx-translate/core';
import { UserPageNavigationComponent } from './_shared/user-page-navigation/user-page-navigation.component';
import {SharedModule} from '../../_shared/shared.module';

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
    RouterModule.forChild(routes),
    TranslateModule,
    SharedModule
  ],
  declarations: [UserPageComponent, SettingsComponent, ProfileComponent, PortfolioComponent, UserPageHeaderComponent, UserPageNavigationComponent],
  exports: [RouterModule]
})
export class UserPageModule {
  constructor(private firebaseService: FirebaseService) {
  }
}
