import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { HamburgerMenuComponent } from './components/hamburger-menu/hamburger-menu.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    MainMenuComponent,
    HamburgerMenuComponent],
  exports: [
    MainMenuComponent,
    HamburgerMenuComponent]
})
export class CommonsModule { }
