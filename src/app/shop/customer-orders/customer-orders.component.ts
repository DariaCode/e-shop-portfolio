import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { OrderService } from '../../shared/services/order.service';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-customer-orders',
    templateUrl: './customer-orders.component.html',
    styleUrls: ['./customer-orders.component.scss'],
    standalone: false
})
export class CustomerOrdersComponent {

  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
    ) {
      this.orders$ = authService.user$.pipe(
        switchMap(u => orderService.getOrdersByUser(u.uid))
      );
    }
}
