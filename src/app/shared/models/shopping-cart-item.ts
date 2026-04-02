import { Item } from './item';

export class ShoppingCartItem {

  // https://www.typescriptlang.org/docs/handbook/classes.html
  constructor(public item: Item, public quantity: number) {
  }
  // Method:
  get totalPrice() {
    return this.item.price * this.quantity;
  }
}
