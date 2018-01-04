import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellCustomerComponent } from './sell-customer.component';

describe('SellCustomerComponent', () => {
  let component: SellCustomerComponent;
  let fixture: ComponentFixture<SellCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
