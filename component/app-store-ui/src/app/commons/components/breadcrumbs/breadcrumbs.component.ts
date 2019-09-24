
import { Component, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, BreadcrumbItem } from '../../../app.data.models';

@Component({
  selector: 'store-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnDestroy {
  activeView: BreadcrumbItem[];

  @Input()
  public isOpen: boolean;

  constructor(private store: Store<AppState>, private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.store.select(s => s.global.breadcrumb).subscribe(m => {
      if (m) {
        this.activeView = m;
        this.cd.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    this.cd.detach();
  }

  leftNavOpened() { }
}

