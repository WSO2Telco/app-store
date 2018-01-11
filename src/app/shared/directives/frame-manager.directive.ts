import { Directive, ElementRef, Input } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';

@Directive({
  selector: '[storeFrameManager]'
})
export class FrameManagerDirective implements OnInit, AfterViewInit {

  /* element with style classes to be removed from loaded iframe content   */
  @Input()
  public storeFrameManager: string[];

  constructor(private _elementRef: ElementRef, private router: Router) { }

  ngOnInit(): void {
    this._elementRef.nativeElement.style.visibility = 'hidden';

    this.router.events.subscribe(() => {
      this._elementRef.nativeElement.style.visibility = 'hidden';
    });
  }

  ngAfterViewInit(): void {

    this._elementRef.nativeElement.onload = () => {

      if (!!this.storeFrameManager) {
        this.storeFrameManager.forEach((selector) => this._elementRef.nativeElement.contentDocument.querySelector(selector).remove());
      }

      this._elementRef.nativeElement.style.visibility = 'visible';
    };


  }
}
