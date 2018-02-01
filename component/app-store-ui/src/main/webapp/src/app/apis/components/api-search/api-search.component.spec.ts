import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiSearchComponent } from './api-search.component';

describe('ApiSearchComponent', () => {
  let component: ApiSearchComponent;
  let fixture: ComponentFixture<ApiSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
