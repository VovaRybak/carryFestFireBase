import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'startup', pathMatch: 'full'},
  { path: '', loadChildren: 'app/modules/get-started/get-started.module#GetStartedModule'},
  { path: '', loadChildren: 'app/modules/user-page/user-page.module#UserPageModule', canLoad: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
