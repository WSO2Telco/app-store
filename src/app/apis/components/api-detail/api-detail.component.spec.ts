import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDetailComponent } from './api-detail.component';

describe('ApiDetailComponent', () => {
  let component: ApiDetailComponent;
  let fixture: ComponentFixture<ApiDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
