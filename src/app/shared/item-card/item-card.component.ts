import { Component, Input } from '@angular/core';
// My models:
import { Item } from '../models/item';
import { ShoppingCart } from '../models/shopping-cart';
// My services:
import { ShoppingCartService } from '../services/shopping-cart.service';


@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})

export class ItemCardComponent {
  // Decorator that marks a class field as an input property
  // and supplies configuration metadata.
  // https://angular.io/api/core/Input
  @Input() item: Item;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart() {
    this.shoppingCartService.addToCart(this.item);
  }

  getQuantity() {
    if (!this.shoppingCart) { return 0; }
    const cartItem = this.shoppingCart.itemsMap[this.item.key];
    return cartItem ? cartItem.quantity : 0;
  }

}
