import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoginIconComponent } from './components/login-icon/login-icon.component';
import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthenticationEffects } from './authentication.effects';
import { authReducer } from './authentication.reducers';
import { AuthenticationService } from './authentication.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('authentication', authReducer),
    EffectsModule.forFeature([AuthenticationEffects]),
  ],
  declarations: [
    LoginIconComponent,
    LoginFormComponent],
  providers: [
    AuthenticationService
  ],
  exports: [
    LoginIconComponent,
    LoginFormComponent
  ]
})
export class AuthenticationModule { }
