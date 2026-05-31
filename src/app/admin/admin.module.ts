import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
// My modules:
import { SharedModule } from '../shared/shared.module';
// My components:
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminItemsComponent } from './admin-items/admin-items.component';
import { AdminItemFormComponent } from './admin-item-form/admin-item-form.component';
// My services:
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';

@NgModule({
  declarations: [
    AdminOrdersComponent,
    AdminItemsComponent,
    AdminItemFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: 'admin/items',
        component: AdminItemsComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: 'admin/items/new',
        component: AdminItemFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: 'admin/items/:id',
        component: AdminItemFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      }
    ])
  ],
  providers: [
    AdminAuthGuardService,
  ]
})
export class AdminModule { }
