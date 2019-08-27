import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiAppSubscriptionsComponent } from './api-app-subscriptions.component';

describe('ApiAppSubscriptionsComponent', () => {
  let component: ApiAppSubscriptionsComponent;
  let fixture: ComponentFixture<ApiAppSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiAppSubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiAppSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
