import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSubscriptionsComponent } from './application-subscriptions.component';

describe('ApplicationSubscriptionsComponent', () => {
  let component: ApplicationSubscriptionsComponent;
  let fixture: ComponentFixture<ApplicationSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationSubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
