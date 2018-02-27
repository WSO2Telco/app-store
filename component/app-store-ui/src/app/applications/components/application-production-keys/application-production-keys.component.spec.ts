import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationProductionKeysComponent } from './application-production-keys.component';

describe('ApplicationProductionKeysComponent', () => {
  let component: ApplicationProductionKeysComponent;
  let fixture: ComponentFixture<ApplicationProductionKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationProductionKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationProductionKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
