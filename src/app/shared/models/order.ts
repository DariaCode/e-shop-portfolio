import { ShoppingCart } from './shopping-cart';
import { Shipping } from './shipping';

export class Order {
  // https://www.typescriptlang.org/docs/handbook/classes.html
  // Properties:
  orderDate: number;
  item: any[];

  constructor(
    public userId: string,
    public shipping: Shipping,
    shopCart: ShoppingCart) {

      this. orderDate = new Date().getTime();

      this.item = shopCart.items.map(i => ({
          item: {
            title: i.item.title,
            price: i.item.price,
            imageUrl: i.item.imageUrl
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice,
        }));
  }
}
