import { Component, OnInit } from '@angular/core';
// Observables are lazy Push collections of multiple values.
import { Observable } from 'rxjs';

import { AppUser } from '../../shared/models/user';
import { ShoppingCart } from '../../shared/models/shopping-cart';
import { AuthService } from '../../shared/services/auth.service';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // Navbar that automatically collapses at the lg (large) breakpoint.
  public isCollapsed = true;
  appUser: AppUser;
  shopCart$: Observable<ShoppingCart>;
  shoppingCartItemCount: number;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.shopCart$ = await this.shoppingCartService.getCart();
    this.shopCart$.subscribe(cart => {
      this.shoppingCartItemCount = cart.totalItemsCount;
    });
  }

  logout() {
    this.auth.logout();
  }

}
