import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiTagComponent } from './api-tag.component';

describe('ApiOverviewComponent', () => {
  let component: ApiTagComponent;
  let fixture: ComponentFixture<ApiTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
