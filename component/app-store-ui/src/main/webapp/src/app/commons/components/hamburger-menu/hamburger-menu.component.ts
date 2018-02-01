import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'store-hamburger-menu',
  template: `
    <div class="hm-menu-container" (click)="onClick()">
      <div class="hamburger-menu" >
          <div class="bar" id="hmenu" [ngClass]="{'animate':isOpen}"></div>
      </div>
    </div>
  `,
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent implements OnInit {

  @Input()
  isOpen = false;

  @Output()
  toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  onClick() {
    this.isOpen = !this.isOpen;
    this.toggle.emit(this.isOpen);
  }
}
