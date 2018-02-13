import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchApplicationsComponent } from './search-applications.component';

describe('SearchApplicationsComponent', () => {
  let component: SearchApplicationsComponent;
  let fixture: ComponentFixture<SearchApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
