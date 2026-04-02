import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  // Properties:
  cart: ShoppingCart;
  cartCounter: number;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    const cartItems = await this.shoppingCartService.getCart();
    cartItems.subscribe( item => {
      this.cart = item;
      this.cartCounter = this.cart.totalItemsCount;
    });
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

}
