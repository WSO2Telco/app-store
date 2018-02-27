import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSandboxKeysComponent } from './application-sandbox-keys.component';

describe('ApplicationSandboxKeysComponent', () => {
  let component: ApplicationSandboxKeysComponent;
  let fixture: ComponentFixture<ApplicationSandboxKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationSandboxKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationSandboxKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
