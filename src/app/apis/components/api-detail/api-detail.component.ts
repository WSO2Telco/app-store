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

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private ngZone: NgZone,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    const ele = this.iframeRef.nativeElement;

    ele.onload = () => {
      ele.contentDocument.querySelector('.header-default').remove();
      ele.contentDocument.querySelector('.media-left').remove();
      ele.contentDocument.querySelector('.form-api-subscription').parentElement.classList.add('lagazySupContainer');
      ele.contentDocument.querySelector('.form-api-subscription').remove();
      ele.contentDocument.querySelector('.footer').remove();

      const innerHost = ele.contentDocument.querySelector('.lagazySupContainer');
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
    };
  }

}
