import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'store-hamburger-menu',
  template: `
    <div class="hm-menu-container" (click)="onClick()">
      <div class="hamburger-menu" >
          <div class="bar" id="hmenu" [ngClass]="{'animate':isClicked}"></div>	
      </div>
    </div>
  `,
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent implements OnInit {

  private isClicked: boolean = true;

  constructor() {
  }

  ngOnInit() {
  }

  onClick() {
    this.isClicked = !this.isClicked;
  }
}
