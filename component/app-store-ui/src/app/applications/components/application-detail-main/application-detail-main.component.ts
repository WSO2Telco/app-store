import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { TabTile } from '../../applications.data.models';

@Component({
  selector: 'store-application-detail-main',
  templateUrl: './application-detail-main.component.html',
  styleUrls: ['./application-detail-main.component.scss']
})
export class ApplicationDetailMainComponent implements OnInit {

  originalTiles = {
    overview: {
      text: 'Overview',
      route: 'overview',
      cols: 1,
      rows: 2,
      class: 'selected'
    },
    appName: {
      text: 'Petstore Application',
      route: 'overview',
      cols: 3,
      rows: 1,
      class: 'appName'
    },
    prodKeys: {
      text: 'Production Keys',
      route: 'production-keys',
      cols: 1,
      rows: 1,
      class: 'default'
    },
    sandboxKeys: {
      text: 'Sandbox Keys',
      route: 'sandbox-keys',
      cols: 1,
      rows: 1,
      class: 'default'
    },
    subscription: {
      text: 'Subscriptions',
      route: 'subscriptions',
      cols: 1,
      rows: 1,
      class: 'default'
    }
  };

  public tiles: TabTile[];

  selectedTile;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.tiles = Object.keys(this.originalTiles).map(
      key => this.originalTiles[key]
    );
    console.log(this.route.snapshot.url);

    this.selectedTile = this.originalTiles.overview;
  }

  onClick(tile, index) {
    if (tile.class !== 'appName') {
      tile.rows = 2;
      tile.class = 'selected';
      this.selectedTile.rows = 1;
      this.selectedTile.class = 'default';

      this.selectedTile = tile;
      this.router.navigate(['/applications/detail/' + tile.route]);
    }
  }
}
