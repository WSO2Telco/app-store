import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginIconComponent } from './components/login-icon/login-icon.component';
import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [LoginIconComponent, LoginFormComponent],
  exports: [
    LoginIconComponent,
    LoginFormComponent
  ]
})
export class AuthenticationModule { }
