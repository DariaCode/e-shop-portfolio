import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersSubject = new BehaviorSubject<any[]>([]);
  orders$: Observable<any[]> = this.ordersSubject.asObservable();

  constructor(private shoppingCartService: ShoppingCartService) {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      this.ordersSubject.next(JSON.parse(savedOrders));
    }
  }

  async placeOrder(order: any) {
    const currentOrders = this.ordersSubject.getValue();
    const newOrder = { ...order, key: Date.now().toString(), datePlaced: new Date().getTime() };
    const updatedOrders = [...currentOrders, newOrder];
    this.saveOrders(updatedOrders);
    this.shoppingCartService.clearCart();
    return newOrder;
  }

  getOrders() {
    return this.orders$;
  }

  getOrdersByUser(userId: string) {
    // In a mock setup, we can filter by userId if provided in order
    return this.orders$;
  }

  private saveOrders(orders: any[]) {
    localStorage.setItem('orders', JSON.stringify(orders));
    this.ordersSubject.next(orders);
  }
}
