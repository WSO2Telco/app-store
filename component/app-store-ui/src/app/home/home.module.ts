import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeRoutes } from './home.routes';
import { SharedModule } from '../shared/shared.module';
import { ThemeComponent } from './components/theme/theme.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutes,
    SwiperModule,
    MatButtonToggleModule,
  ],
  declarations: [DashboardComponent, ThemeComponent, ThumbnailComponent,SignUpComponent],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class HomeModule { }
