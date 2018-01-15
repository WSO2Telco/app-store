import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { HamburgerMenuComponent } from './components/hamburger-menu/hamburger-menu.component';
import { SharedModule } from '../shared/shared.module';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    MainMenuComponent,
    HamburgerMenuComponent,
    BreadcrumbsComponent],
  exports: [
    MainMenuComponent,
    BreadcrumbsComponent,
    HamburgerMenuComponent]
})
export class CommonsModule { }
