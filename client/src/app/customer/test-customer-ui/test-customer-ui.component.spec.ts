import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCustomerUiComponent } from './test-customer-ui.component';

describe('TestCustomerUiComponent', () => {
  let component: TestCustomerUiComponent;
  let fixture: ComponentFixture<TestCustomerUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCustomerUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCustomerUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
