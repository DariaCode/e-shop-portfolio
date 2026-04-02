import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// https://www.learnrxjs.io/learn-rxjs/operators/filtering/take
import { take } from 'rxjs/operators';

import { ItemService } from '../../shared/services/item.service';
import { FilterService } from '../../shared/services/filter.service';


interface Item {
  title: string;
  price: string;
  category: string;
  imageUrl: string;
}
@Component({
  selector: 'app-admin-item-form',
  templateUrl: './admin-item-form.component.html',
  styleUrls: ['./admin-item-form.component.scss']
})
export class AdminItemFormComponent implements OnInit {
  categories$;
  item = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private filterService: FilterService
  ) { 
    this.categories$ = filterService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.itemService.get(this.id).pipe(take(1))
      .subscribe(i => this.item = i);
    }
    console.log('admin-item-form:', this.categories$)
  }

  save(item) {
    console.log('save item: ', item);
    if (this.id) {
      this.itemService.update(this.id, item);
    } else {
      this.itemService.create(item);
    }
    this.router.navigate(['/admin/items']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.itemService.delete(this.id);
    this.router.navigate(['/admin/items']);
  }

  ngOnInit(): void {
  }

}
