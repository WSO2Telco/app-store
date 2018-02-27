import { Component, OnInit } from "@angular/core";

@Component({
  selector: "store-application-detail-main",
  templateUrl: "./application-detail-main.component.html",
  styleUrls: ["./application-detail-main.component.scss"]
})
export class ApplicationDetailMainComponent implements OnInit {
  tiles = [
    { text: "Detais", cols: 1, rows: 2, class: "selected" },
    { text: "Petstore Application", cols: 3, rows: 1, class: "appName" },
    { text: "Production Keys", cols: 1, rows: 1, class: "default" },
    { text: "Sandbox Keys", cols: 1, rows: 1, class: "default" },
    { text: "Subscriptions", cols: 1, rows: 1, class: "default" }
  ];

  selectedTile = this.tiles[0];

  constructor() {}

  ngOnInit() {}

  onClick(tile, index) {
    tile.rows = 2;
    tile.class="selected";
    this.selectedTile.rows = 1;
    this.selectedTile.class="default";
    const newFirst = this.tiles.splice(index, 1);
    const xFirst = this.tiles.shift();
    this.tiles.push(xFirst);
    this.selectedTile = tile;
    this.tiles.unshift(this.selectedTile);
  }
}
