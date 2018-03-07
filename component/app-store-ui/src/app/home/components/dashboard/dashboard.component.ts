import { Component, OnInit } from "@angular/core";
import { ThumbnailParam } from "../../home.data.models";

@Component({
  selector: "store-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  thumbnailParams: ThumbnailParam[] = [
    new ThumbnailParam('APIS','/apis','apis'),
    new ThumbnailParam('APPLICATIONS','/applications','apps'),
    new ThumbnailParam('FORUM','/forum','forum'),
    new ThumbnailParam('STATISTICS','/statistics','stat')
  ];

  constructor() {}

  ngOnInit() {}
}
