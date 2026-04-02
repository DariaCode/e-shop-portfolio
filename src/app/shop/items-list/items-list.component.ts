import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// https://rxjs-dev.firebaseapp.com/guide/subscription
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// My models:
import { Item } from '../../shared/models/item';
import { ShoppingCart } from '../../shared/models/shopping-cart';
// My services:
import { ItemService } from '../../shared/services/item.service';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
// https://angular.io/guide/lifecycle-hooks
export class ItemsListComponent implements OnInit, OnDestroy {
  // Properties:
  items: Item[] = [];
  filteredItems: Item[];
  cart: ShoppingCart;
  category: string;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private shoppingCartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .subscribe(cart => {
        this.cart = cart as ShoppingCart;
      });

    // https://rxjs-dev.firebaseapp.com/api/operators/switchMap
    this.itemService.getAll()
      .pipe(switchMap(items => {
        this.items = items;
        // queryParamMap - An Observable that contains a map of the
        // query parameters available to all routes. The map supports retrieving
        // single and multiple values from the query parameter.
        return this.route.queryParamMap;
      }))
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredItems = (this.category) ?
          this.items.filter(i => i.category === this.category) :
          this.items;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
