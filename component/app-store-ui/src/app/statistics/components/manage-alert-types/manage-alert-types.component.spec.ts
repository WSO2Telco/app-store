import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAlertTypesComponent } from './manage-alert-types.component';

describe('ManageAlertTypesComponent', () => {
  let component: ManageAlertTypesComponent;
  let fixture: ComponentFixture<ManageAlertTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAlertTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAlertTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
