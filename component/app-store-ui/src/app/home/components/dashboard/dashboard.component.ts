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
    new ThumbnailParam('APIs','/apis','apis', 'extension',"Manage API's, browse and search APIs by provider, tags or name , manage subscriptions on a per-application basis and more..."),
    new ThumbnailParam('Applications','/applications','apps', 'apps',"Manage applications by application creation, filter application, sort applications by name,workflow status, tier , edit facilities and more..."),
    new ThumbnailParam('Forum','/forum','forum', 'forum',"Share your ideas and views on a particular issue with our powerful forum engine with Rich text editor, tag forum topics, Posts attachments, Emojis and more..."),
    new ThumbnailParam('Statistics','/statistics','stat', 'insert_chart',"Comes with many usage graphs such as API latency and API usage comparison that help to monitor API and application performance and much more.", 'http://www.apigate.com')
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
  public username:string = null;

  constructor(private store: Store<AppState>, private titleService: Title) {}

  ngOnInit() {
    this.store.dispatch(globalActions.SetBreadcrumbAction({payload:[new BreadcrumbItem("Home")]}));
    this.titleService.setTitle("Apigate API Store");

    let autologout = localStorage.getItem('autologout');
    if(autologout == "true") this.autoLogout = true;
    localStorage.removeItem('autologout');

    this.store.select((s) => s.authentication.loggedUser).subscribe((user) => {
      this.username = user;
    })
  }

  public onIndexChange(index: number) {
    // console.log('Swiper index: ', index);
  }
}
