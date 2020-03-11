import { Component, OnInit, ViewChild } from "@angular/core";
import { ThumbnailParam } from "../../home.data.models";
import Swiper from 'swiper';

//Breadcrumbs
import * as globalActions from "../../../app.actions";
import { BreadcrumbItem, AppState } from "../../../app.data.models";
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: "store-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  thumbnailParams: ThumbnailParam[] = [
    new ThumbnailParam('APIs','/apis','apis', 'extension'),
    new ThumbnailParam('Applications','/applications','apps', 'apps'),
    new ThumbnailParam('Forum','/forum','forum', 'forum'),
    new ThumbnailParam('Statistics','/statistics','stat', 'insert_chart', 'http://www.apigate.com')
  ];

  imageUrlArray = [
    { url: 'assets/slides/slide-1.png', caption: 'Apigate', href: '#config' },
    { url: 'assets/slides/slide-2.png', caption: 'Apigate', href: '#config' },
    { url: 'assets/slides/slide-3.png', caption: 'Apigate', href: '#config' },
    { url: 'assets/slides/slide-4.png', caption: 'Apigate', href: '#config' }
  ];

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    effect: 'fade',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    navigation: true,
    pagination: false,
    autoplay: true
  };
  public autoLogout = false;

  constructor(private store: Store<AppState>, private titleService: Title) {}

  ngOnInit() {
    this.store.dispatch(globalActions.SetBreadcrumbAction({payload:[new BreadcrumbItem("Home")]}));
    this.titleService.setTitle("Apigate API Store");

    let autologout = localStorage.getItem('autologout');
    if(autologout == "true") this.autoLogout = true;
    localStorage.removeItem('autologout');
  }

  public onIndexChange(index: number) {
    // console.log('Swiper index: ', index);
  }
}
