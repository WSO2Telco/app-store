import { Component, OnInit } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from "@angular/router";
import { TabTile } from "../../applications.data.models";

@Component({
  selector: "store-application-detail-main",
  templateUrl: "./application-detail-main.component.html",
  styleUrls: ["./application-detail-main.component.scss"]
})
export class ApplicationDetailMainComponent implements OnInit {
  originalTiles = {
    overview: {
      index:0,
      text: "Overview",
      route: "overview",
      cols: 1,
      rows: 2,
      class: "selected"
    },
    appName: {
      index:1,
      text: "Petstore Application",
      route: "overview",
      cols: 3,
      rows: 1,
      class: "appName"
    },
    "production-keys": {
      index:2,
      text: "Production Keys",
      route: "production-keys",
      cols: 1,
      rows: 1,
      class: "default"
    },
    "sandbox-keys": {
      index:3,
      text: "Sandbox Keys",
      route: "sandbox-keys",
      cols: 1,
      rows: 1,
      class: "default"
    },
    subscriptions: {
      index:4,
      text: "Subscriptions",
      route: "subscriptions",
      cols: 1,
      rows: 1,
      class: "default"
    }
  };

  public tiles: TabTile[];

  public selectedTile = this.originalTiles.overview;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.tiles = Object.keys(this.originalTiles).map(
      key => this.originalTiles[key]
    );

    this.route.url.subscribe(d => {
      try {
        const childRoute = this.route.snapshot.firstChild.routeConfig.path;
        const tile = this.originalTiles[childRoute];
        this.makeSelection(tile,tile.index);
      } catch (e) {
        this.selectedTile = this.originalTiles.overview;
      }
    });
  }

  makeSelection(tile, index) {
    if (tile.class !== "appName" && tile !== this.selectedTile) {
      tile.rows = 2;
      tile.class = "selected";
      this.selectedTile.rows = 1;
      this.selectedTile.class = "default";

      this.selectedTile = tile;
     
    }
  }

  nav(tile){
     this.router.navigate(["/applications/detail/" + tile.route]);
  }
}
