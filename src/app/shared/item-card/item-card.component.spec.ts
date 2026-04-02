import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemCardComponent } from './item-card.component';
import { Item } from '../models/item';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

describe('ItemCardComponent', () => {
  let component: ItemCardComponent;
  let fixture: ComponentFixture<ItemCardComponent>;
  let mockShoppingCartService: any;
  let item: Item;
  let shoppingCart: ShoppingCart;

  beforeEach(async () => {
    mockShoppingCartService = jasmine.createSpyObj(['addToCart']);

    await TestBed.configureTestingModule({
      declarations: [ ItemCardComponent ],
      providers: [ { provide: ShoppingCartService, useValue: mockShoppingCartService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardComponent);
    component = fixture.componentInstance;
    item = { key: '1', title: 'Test Item', price: 10, category: 'test category', imageUrl: 'https://example.com/image.jpg' };
    shoppingCart = new ShoppingCart({ 1: { item, quantity: 2, totalPrice: 20 } });
    component.item = item;
    component.shoppingCart = shoppingCart;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show item title', () => {
    const titleElement: HTMLElement = fixture.nativeElement.querySelector('.item-card-title');

    expect(titleElement.textContent).toContain(item.title);
  });

  it('should show item price', () => {
    const priceElement: HTMLElement = fixture.nativeElement.querySelector('.item-card-price');

    expect(priceElement.textContent).toContain('$' + item.price);
  });

  it('should show item image', () => {
    const imgElement: HTMLImageElement = fixture.nativeElement.querySelector('.card-img-top');

    expect(imgElement.src).toContain(item.imageUrl);
  });

  it('should not show add to cart button if item already in cart', () => {
    const addToCartButton: HTMLButtonElement = fixture.nativeElement.querySelector('.btn');

    expect(addToCartButton).toBeFalsy();
  });

  it('should render the item quantity component when quantity is greater than zero', () => {
    fixture.detectChanges();
    const quantityComponent = fixture.nativeElement.querySelector('app-item-quantity');

    expect(quantityComponent).toBeTruthy();
  });

  it('should show add to cart button if item not already in cart', () => {
    component.shoppingCart = new ShoppingCart({});
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');

    expect(button).toBeTruthy();
  });
});
