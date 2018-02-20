import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiForumComponent } from './api-forum.component';

describe('ApiForumComponent', () => {
  let component: ApiForumComponent;
  let fixture: ComponentFixture<ApiForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
