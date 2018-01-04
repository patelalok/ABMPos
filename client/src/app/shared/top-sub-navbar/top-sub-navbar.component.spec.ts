import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSubNavbarComponent } from './top-sub-navbar.component';

describe('TopSubNavbarComponent', () => {
  let component: TopSubNavbarComponent;
  let fixture: ComponentFixture<TopSubNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSubNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSubNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
