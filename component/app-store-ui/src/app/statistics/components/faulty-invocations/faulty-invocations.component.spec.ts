import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultyInvocationsComponent } from './faulty-invocations.component';

describe('FaultyInvocationsComponent', () => {
  let component: FaultyInvocationsComponent;
  let fixture: ComponentFixture<FaultyInvocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaultyInvocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaultyInvocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
