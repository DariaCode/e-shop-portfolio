import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// My modules:
import { SharedModule } from '../shared/shared.module';
// My components:
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsFilterComponent } from './items-filter/items-filter.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { CheckoutSummaryComponent } from './checkout-summary/checkout-summary.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { HomeComponent } from './home/home.component';
// My services:
import { AuthGuardService } from '../shared/services/auth-guard.service';

@NgModule({
  declarations: [
    ItemsListComponent,
    ItemsFilterComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    CheckoutFormComponent,
    CheckoutSummaryComponent,
    CheckoutSuccessComponent,
    CustomerOrdersComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent},
      { path: 'products', component: ItemsListComponent},
      { path: 'shopping-cart', component: ShoppingCartComponent},
      { path: 'check-out', component: CheckoutComponent, canActivate: [AuthGuardService]},
      { path: 'check-out-success/:id', component: CheckoutSuccessComponent, canActivate: [AuthGuardService]},
      { path: 'my-orders', component: CustomerOrdersComponent, canActivate: [AuthGuardService]}
    ]),
    FormsModule
  ]
})
export class ShopModule { }
