import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// My components:
import { ItemCardComponent } from './item-card/item-card.component';
import { ItemQuantityComponent } from './item-quantity/item-quantity.component';
// My services:
import { ItemService } from './services/item.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { FilterService } from './services/filter.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { OrderService } from './services/order.service';

@NgModule({
  declarations: [
    ItemCardComponent,
    ItemQuantityComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    ItemService,
    ShoppingCartService,
    FilterService,
    UserService,
    AuthService,
    AuthGuardService,
    OrderService
  ],
  exports: [
    ItemCardComponent,
    ItemQuantityComponent
  ]
})
export class SharedModule { }
