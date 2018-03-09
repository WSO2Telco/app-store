import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicResultComponent } from './topic-result.component';

describe('TopicResultComponent', () => {
  let component: TopicResultComponent;
  let fixture: ComponentFixture<TopicResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
