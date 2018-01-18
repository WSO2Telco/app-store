import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './authentication/components/sign-up/sign-up.component';
import { MyAccountComponent } from './authentication/components/my-account/my-account.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: 'app/home/home.module#HomeModule'
  },
  {
    path: 'legacy',
    loadChildren: 'app/legacy/legacy.module#LegacyModule'
  },
  {
    path: 'apis',
    loadChildren: 'app/apis/apis.module#ApisModule'
  },
  {
    path: 'application/sign-up',
    component: SignUpComponent
  },
  {
    path: 'application/my-account',
    component: MyAccountComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
