import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenInvoiceComponent } from './open-invoice.component';

describe('OpenInvoiceComponent', () => {
  let component: OpenInvoiceComponent;
  let fixture: ComponentFixture<OpenInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
