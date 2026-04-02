import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Item } from '../models/item';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartSubject = new BehaviorSubject<ShoppingCart>(new ShoppingCart({}));
  cart$: Observable<ShoppingCart> = this.cartSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    return this.cart$;
  }

  addToCart(item: Item) {
    this.updateItem(item, 1);
  }

  removeFromCart(item: Item) {
    this.updateItem(item, -1);
  }

  async clearCart() {
    localStorage.removeItem('cart');
    this.cartSubject.next(new ShoppingCart({}));
  }

  private updateItem(item: Item, change: number) {
    const currentCart = this.cartSubject.getValue();
    const items = currentCart.itemsMap || {};
    const cartItem = items[item.key];
    const quantity = (cartItem ? cartItem.quantity : 0) + change;

    if (quantity === 0) {
      delete items[item.key];
    } else {
      items[item.key] = new ShoppingCartItem(
        item,
        quantity
      );
    }

    const updatedCart = new ShoppingCart(items);
    this.saveCart(updatedCart);
  }

  private saveCart(cart: ShoppingCart) {
    localStorage.setItem('cart', JSON.stringify(cart.itemsMap));
    this.cartSubject.next(cart);
  }

  private loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const itemsMap = JSON.parse(savedCart);
      for (let key in itemsMap) {
        const itemData = itemsMap[key];
        itemsMap[key] = new ShoppingCartItem(itemData.item, itemData.quantity);
      }
      this.cartSubject.next(new ShoppingCart(itemsMap));
    }
  }
}
