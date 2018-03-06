import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiUsageComponent } from './api-usage.component';

describe('ApiUsageComponent', () => {
  let component: ApiUsageComponent;
  let fixture: ComponentFixture<ApiUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
