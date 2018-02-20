import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiConsoleComponent } from './api-console.component';

describe('ApiConsoleComponent', () => {
  let component: ApiConsoleComponent;
  let fixture: ComponentFixture<ApiConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
