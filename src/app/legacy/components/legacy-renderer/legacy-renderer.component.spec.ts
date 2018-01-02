import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegacyRendererComponent } from './legacy-renderer.component';

describe('LegacyRendererComponent', () => {
  let component: LegacyRendererComponent;
  let fixture: ComponentFixture<LegacyRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegacyRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegacyRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
