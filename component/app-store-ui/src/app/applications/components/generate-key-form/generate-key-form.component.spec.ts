import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateKeyFormComponent } from './generate-key-form.component';

describe('GenerateKeyFormComponent', () => {
  let component: GenerateKeyFormComponent;
  let fixture: ComponentFixture<GenerateKeyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateKeyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateKeyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
