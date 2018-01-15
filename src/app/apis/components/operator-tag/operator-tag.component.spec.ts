import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorTagComponent } from './operator-tag.component';

describe('OperatorTagComponent', () => {
  let component: OperatorTagComponent;
  let fixture: ComponentFixture<OperatorTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
