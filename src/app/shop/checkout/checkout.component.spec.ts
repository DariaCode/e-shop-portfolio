import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { ShoppingCart } from '../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { Observable, of } from 'rxjs';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let shoppingCartService: jasmine.SpyObj<ShoppingCartService>;
  const mockShoppingCart: ShoppingCart = {
    items: [],
    totalItemsCount: 0,
    totalPrice: 0,
    itemsMap: {}
  };

  beforeEach(async(() => {
    shoppingCartService = jasmine.createSpyObj('ShoppingCartService', ['getCart']);

    TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      providers: [
        { provide: ShoppingCartService, useValue: shoppingCartService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the shopping cart on ngOnInit', async () => {
    shoppingCartService.getCart.and.returnValue(Promise.resolve(of(mockShoppingCart)));

    await component.ngOnInit();

    expect(shoppingCartService.getCart).toHaveBeenCalled();
    expect(component.cart).toEqual(mockShoppingCart);
  });

});
