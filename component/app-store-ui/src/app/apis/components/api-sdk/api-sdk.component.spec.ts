import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiSdkComponent } from './api-sdk.component';

describe('ApiSdkComponent', () => {
  let component: ApiSdkComponent;
  let fixture: ComponentFixture<ApiSdkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiSdkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiSdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
