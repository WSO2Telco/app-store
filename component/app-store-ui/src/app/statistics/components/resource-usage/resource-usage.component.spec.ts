import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceUsageComponent } from './resource-usage.component';

describe('ResourceUsageComponent', () => {
  let component: ResourceUsageComponent;
  let fixture: ComponentFixture<ResourceUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
