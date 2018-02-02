import {
  Component, OnInit, ComponentFactoryResolver, NgZone, AfterViewInit, ApplicationRef,
  ViewChild, ElementRef, Injector
} from '@angular/core';
import { ApiSubscriptionComponent } from '../api-subscription/api-subscription.component';
import { Store } from '@ngrx/store/src/store';
import { AppState } from '../../../app.models';
import { ToggleLeftPanelAction } from '../../../app.actions';

@Component({
  selector: 'store-api-detail',
  templateUrl: './api-detail.component.html',
  styleUrls: ['./api-detail.component.scss']
})
export class ApiDetailComponent implements OnInit, AfterViewInit {

  @ViewChild('iframeRef', { read: ElementRef }) iframeRef: ElementRef;

  private nativeElement;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private ngZone: NgZone,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) { }

  ngOnInit() {
    this.nativeElement = this.iframeRef.nativeElement;
    this.nativeElement.style.visibility = 'hidden';
  }

  ngAfterViewInit(): void {
    this.nativeElement.onload = () => {
      this.nativeElement.contentDocument.querySelector('.header-default').remove();
      this.nativeElement.contentDocument.querySelector('.navbar-wrapper').remove();
      this.nativeElement.contentDocument.querySelector('.media-left').remove();
      this.nativeElement.contentDocument.querySelector('.footer').remove();

      const icon = this.nativeElement.contentDocument.querySelector('.white-wrapper');
      if (!!icon) {
        icon.parentElement.classList.add('icon-remove');
        this.nativeElement.contentDocument.querySelector('.icon-remove').remove();
      }

      const injetingTarget = this.nativeElement.contentDocument.querySelector('.form-api-subscription');
      if (!!injetingTarget) {
        injetingTarget.parentElement.classList.add('lagazySupContainer');
        injetingTarget.remove();

        const innerHost = this.nativeElement.contentDocument.querySelector('.lagazySupContainer');
        const element = document.createElement('store-api-subscription');
        innerHost.appendChild(element);

        this.ngZone.run(() => {
          const componetFactory = this.componentFactoryResolver.resolveComponentFactory(ApiSubscriptionComponent);
          const componentRef = componetFactory.create(this.injector, [], innerHost);
          const hostView = componentRef.hostView;

          try {
            this.applicationRef.attachView(hostView);
          } catch (e) {
            console.log('ERROR' + e);
          }
        });
      }

      this.nativeElement.style.visibility = 'visible';
    };
  }

}
