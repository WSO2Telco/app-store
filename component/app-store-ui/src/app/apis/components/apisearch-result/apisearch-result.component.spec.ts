import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApisearchResultComponent } from './apisearch-result.component';

describe('ApisearchResultComponent', () => {
  let component: ApisearchResultComponent;
  let fixture: ComponentFixture<ApisearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApisearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApisearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
