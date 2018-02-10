import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcustomerComponent } from './subcustomer.component';

describe('SubcustomerComponent', () => {
  let component: SubcustomerComponent;
  let fixture: ComponentFixture<SubcustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
