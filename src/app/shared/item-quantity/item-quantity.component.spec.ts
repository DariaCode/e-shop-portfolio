import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Item } from '../models/item';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

import { ItemQuantityComponent } from './item-quantity.component';

describe('ItemQuantityComponent', () => {
  let component: ItemQuantityComponent;
  let fixture: ComponentFixture<ItemQuantityComponent>;
  let mockCartService: any;
  let mockItem: Item;
  let mockShoppingCart: ShoppingCart;

  beforeEach(() => {
    mockCartService = jasmine.createSpyObj(['addToCart', 'removeFromCart']);

    TestBed.configureTestingModule({
      declarations: [ ItemQuantityComponent ],
      providers: [
        { provide: ShoppingCartService, useValue: mockCartService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemQuantityComponent);
    component = fixture.componentInstance;
    mockItem = {
      key: '1',
      title: 'Test Item',
      price: 10,
      category: 'test',
      imageUrl: 'test-url'
    };
    mockShoppingCart = new ShoppingCart({
      1: {
        item: mockItem,
        quantity: 2,
        totalPrice: mockItem.price * 2
      }
    });
    component.item = mockItem;
    component.shoppingCart = mockShoppingCart;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addToCart method of cart service when add button is clicked', () => {
    const addToCartButton = fixture.nativeElement.querySelector('.add-btn');
    addToCartButton.click();

    expect(mockCartService.addToCart).toHaveBeenCalledWith(mockItem);
  });

  it('should call removeFromCart method of cart service when remove button is clicked', () => {
    const removeFromCartButton = fixture.nativeElement.querySelector('.remove-btn');
    removeFromCartButton.click();

    expect(mockCartService.removeFromCart).toHaveBeenCalledWith(mockItem);
  });

  it('should return correct quantity for an item in the shopping cart', () => {
    expect(component.getQuantity()).toBe(2);
  });

  it('should return 0 for an item not in the shopping cart', () => {
    component.item = { key: '2', title: 'Another Item', price: 20, category: 'test', imageUrl: 'test-url' };

    expect(component.getQuantity()).toBe(0);
  });
});
