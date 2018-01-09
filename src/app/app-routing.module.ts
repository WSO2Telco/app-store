import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
