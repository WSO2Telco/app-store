
import {fromEvent as observableFromEvent,  Observable } from 'rxjs';
import { Directive, AfterViewInit, Input, ElementRef } from '@angular/core';
import { ScrollPosition } from '../models/shared.models';







@Directive({
  selector: '[storeInfiniteScroll]'
})
export class InfiniteScrollDirective implements AfterViewInit {

  DEFAULT_SCROLL_POSITION: ScrollPosition = {
    sH: 0,
    sT: 0,
    cH: 0
  };

  private scrollEvent$;

  private userScrolledDown$;

  private requestStream$;

  private requestOnScroll$;

  @Input()
  scrollCallback;

  @Input()
  immediateCallback;

  @Input()
  scrollPercent = 70;

  constructor(private elm: ElementRef) { }

  ngAfterViewInit(): void {
    this.registerScrollEvent();

    this.streamScrollEvents();

    this.requestCallbackOnScroll();
  }

  private registerScrollEvent() {
    const ele = document.getElementById('ss');
    this.scrollEvent$ = observableFromEvent(ele, 'scroll');
  }

  private streamScrollEvents() {
    this.userScrolledDown$ = this.scrollEvent$
      .map((e: any): ScrollPosition => ({
        sH: e.target.scrollHeight,
        sT: e.target.scrollTop,
        cH: e.target.clientHeight
      }))
      .pairwise()
      .filter(positions => this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1]));
  }

  private isUserScrollingDown = (positions) => {
    return positions[0].sT < positions[1].sT;
  }

  private isScrollExpectedPercent = (position) => {
    return ((position.sT + position.cH) / position.sH) > (this.scrollPercent / 100);
  }

  private requestCallbackOnScroll() {
    this.requestOnScroll$ = this.userScrolledDown$;

    if (this.immediateCallback) {
      this.requestOnScroll$ = this.requestOnScroll$
        .startWith([this.DEFAULT_SCROLL_POSITION, this.DEFAULT_SCROLL_POSITION]);
    }

    this.requestOnScroll$
      .exhaustMap(() => this.scrollCallback())
      .subscribe(() => { });
  }


}
