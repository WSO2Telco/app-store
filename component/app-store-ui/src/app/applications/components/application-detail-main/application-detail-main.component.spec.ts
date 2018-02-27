import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDetailMainComponent } from './application-detail-main.component';

describe('ApplicationDetailMainComponent', () => {
  let component: ApplicationDetailMainComponent;
  let fixture: ComponentFixture<ApplicationDetailMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationDetailMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDetailMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
