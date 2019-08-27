import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeRoutes } from './home.routes';
import { SharedModule } from '../shared/shared.module';
import { ThemeComponent } from './components/theme/theme.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { SlideshowModule } from 'ng-simple-slideshow';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutes,
    SlideshowModule
  ],
  declarations: [DashboardComponent, ThemeComponent, ThumbnailComponent]
})
export class HomeModule { }
