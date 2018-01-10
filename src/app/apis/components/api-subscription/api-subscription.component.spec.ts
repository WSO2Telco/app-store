import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiSubscriptionComponent } from './api-subscription.component';

describe('ApiSubscriptionComponent', () => {
  let component: ApiSubscriptionComponent;
  let fixture: ComponentFixture<ApiSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
