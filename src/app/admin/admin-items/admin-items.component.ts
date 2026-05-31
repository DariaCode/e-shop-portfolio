import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Item } from '../../shared/models/item';
import { ItemService } from '../../shared/services/item.service';

@Component({
    selector: 'app-admin-items',
    templateUrl: './admin-items.component.html',
    styleUrls: ['./admin-items.component.scss'],
    standalone: false
})
export class AdminItemsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  items: Item[];
  dataSource: MatTableDataSource<Item>;
  displayedColumns: string[] = ['title', 'price', 'category', 'edit'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private itemService: ItemService
  ) {
    this.subscription = this.itemService.getAll()
      .subscribe(items => {
        this.items = items;
        this.dataSource = new MatTableDataSource(this.items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('admin-items: ', this.items);
      });
  }

  filter(query: string) {
    this.dataSource.filter = query.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
