import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { OrderService } from '../../shared/services/order.service';

import { ShoppingCart } from '../../shared/models/shopping-cart';
import { Order } from '../../shared/models/order';
import { Shipping } from '../../shared/models/shipping';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent implements OnInit, OnDestroy {

  @Input('shopping-cart') shoppingCart: ShoppingCart;
  shipping: Shipping = {} as Shipping;
  userSubscription: Subscription;
  userId;

  constructor(
    public router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  async addOrder() {
    const order = new Order(this.userId, this.shipping, this.shoppingCart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/check-out-success', result.key]);
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}

