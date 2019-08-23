import { Component, OnInit, ViewChild } from "@angular/core";
import { ThumbnailParam } from "../../home.data.models";
import { IImage } from 'ng-simple-slideshow';

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
    new ThumbnailParam('Statistics','/statistics','stat', 'insert_chart')
  ];

  imageUrlArray: (string | IImage)[] = [
    { url: 'assets/slides/1.png', caption: 'Apigate', href: '#config' },
    { url: 'assets/slides/2.png', caption: 'Apigate', href: '#config' },
    { url: 'assets/slides/3.png', caption: 'Apigate', href: '#config' },
    { url: 'assets/slides/4.png', caption: 'Apigate', href: '#config' },
    { url: 'assets/slides/5.png', caption: 'Apigate', href: '#config' },
    { url: 'assets/slides/6.png', caption: 'Apigate', href: '#config' },
    // { url: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/9278671/jbareham_170917_2000_0124.jpg', clickAction: () => alert('custom click function') },
  ];

  // @ViewChild('slideshow') slideshow: any;

  constructor() {}

  ngOnInit() {}
}
