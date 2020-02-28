import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyAccountComponent } from './authentication/components/my-account/my-account.component';
import { AppGuard } from './app.guards';
import { helpComponent } from './authentication/components/help/help.component';
import { ResetPasswordComponent } from './authentication/components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'legacy',
    loadChildren: () => import('./legacy/legacy.module').then(m => m.LegacyModule)
  },
  {
    path: 'apis',
    loadChildren: () => import('./apis/apis.module').then(m => m.ApisModule)
  },
  {
    path: 'forum',
    loadChildren: () => import('./forum/forum.module').then(m => m.ForumModule),
    canActivate: [AppGuard]
  },
  {
    path: 'applications',
    loadChildren: () => import('./applications/applications.module').then(m => m.ApplicationsModule),
    canActivate: [AppGuard]
  },
  {
    path: 'statistics',
    loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule),
    canActivate: [AppGuard]
  },
  {
    path: 'application/help',
    component: helpComponent
  },
  {
    path: 'application/my-account',
    component: MyAccountComponent
  },
  {
    path: 'application/reset-password/:username/:code',
    component: ResetPasswordComponent
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