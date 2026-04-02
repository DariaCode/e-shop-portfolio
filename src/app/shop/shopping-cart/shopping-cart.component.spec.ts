import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../shared/models/shopping-cart';
import { of } from 'rxjs';


describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let mockShoppingCartService: jasmine.SpyObj<ShoppingCartService>;

  beforeEach(() => {
    mockShoppingCartService = jasmine.createSpyObj('ShoppingCartService', ['getCart', 'clearCart']);

    TestBed.configureTestingModule({
      declarations: [ShoppingCartComponent],
      providers: [{ provide: ShoppingCartService, useValue: mockShoppingCartService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cart and cartCounter on ngOnInit', async () => {
    const mockItemsMap = {
      1: { item: { title: 'Item 1', imageUrl: 'image-url-1', price: 5, category: 'Category 1' }, quantity: 2, totalPrice: 10 },
      2: { item: { title: 'Item 2', imageUrl: 'image-url-2', price: 3, category: 'Category 2' }, quantity: 1, totalPrice: 3 }
    };

    const mockCart: ShoppingCart = {
      items: [],
      itemsMap: mockItemsMap,
      totalItemsCount: 3,
      totalPrice: 13
    };

    mockShoppingCartService.getCart.and.returnValue(Promise.resolve(of(mockCart)));

    await component.ngOnInit();

    expect(mockShoppingCartService.getCart).toHaveBeenCalled();
    expect(component.cart).toEqual(mockCart);
    expect(component.cartCounter).toEqual(mockCart.totalItemsCount);
  });

  it('should call clearCart method of ShoppingCartService when clearCart is called', () => {
    component.clearCart();

    expect(mockShoppingCartService.clearCart).toHaveBeenCalled();
  });
});
