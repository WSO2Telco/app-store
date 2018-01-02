import { Directive, ElementRef } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';

@Directive({
  selector: '[storeFrameManager]'
})
export class FrameManagerDirective implements OnInit, AfterViewInit {

  constructor(private _elementRef: ElementRef, private router: Router) { }

  ngOnInit(): void {
    this._elementRef.nativeElement.style.visibility = 'hidden';

    this.router.events.subscribe(() => {
      this._elementRef.nativeElement.style.visibility = 'hidden';
    });
  }

  ngAfterViewInit(): void {

    this._elementRef.nativeElement.onload = () => {

      this._elementRef.nativeElement.contentDocument.querySelector('.header-default').remove();
      this._elementRef.nativeElement.contentDocument.querySelector('.media-left').remove();
      this._elementRef.nativeElement.contentDocument.querySelector('.footer').remove();
      this._elementRef.nativeElement.style.visibility = 'visible';
    };


  }
}
