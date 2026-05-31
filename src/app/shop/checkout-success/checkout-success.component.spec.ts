import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutSuccessComponent } from './checkout-success.component';

describe('CheckoutSuccessComponent', () => {
  let component: CheckoutSuccessComponent;
  let fixture: ComponentFixture<CheckoutSuccessComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct text', () => {
    expect(fixture.nativeElement.querySelector('h1').textContent).toEqual('Thank you!');
    expect(fixture.nativeElement.querySelector('h5').textContent).toEqual('Your order was successfully submitted.');
  });

  it('should have the correct buttons', () => {
    expect(fixture.nativeElement.querySelector('.showOrderBtn')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.orderMoreBtn')).toBeTruthy();
  });
});
