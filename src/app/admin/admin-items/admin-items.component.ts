import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
// https://github.com/yanivps/angular-7-data-table#readme
import { DataTableResource } from 'angular7-data-table';
import { Item } from '../../shared/models/item';
import { ItemService } from '../../shared/services/item.service';

@Component({
  selector: 'app-admin-items',
  templateUrl: './admin-items.component.html',
  styleUrls: ['./admin-items.component.scss']
})
export class AdminItemsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  tableResource: DataTableResource<Item>;
  items: Item[];
  entries: Item[] = [];
  itemCount: number;

  constructor(
    private itemService: ItemService
  ) {
    this.subscription = this.itemService.getAll()
      .subscribe(items => {
        const temp: any[] = items;
        this.items = temp;
        this.initializeTable(this.items);
        console.log('admin-items: ',this.items);
      });
  }

  private initializeTable(items: Item[]) {
    this.tableResource = new DataTableResource(items);
    this.tableResource.query({ offset: 0 })
      .then(items => this.entries = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  filter(query: string) {
    const filteredItems = (query) ?
      this.items.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.items;
    this.initializeTable(filteredItems);
  }

  reloadItems(params) {
    if (!this.tableResource)
      {return;}

    this.tableResource.query(params)
      .then(items => this.entries = items);
  }

  ngOnInit(){
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
