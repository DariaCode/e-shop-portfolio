import { Component, OnInit, Input } from '@angular/core';
import { FilterService } from '../../shared/services/filter.service';

@Component({
  selector: 'app-items-filter',
  templateUrl: './items-filter.component.html',
  styleUrls: ['./items-filter.component.scss']
})
export class ItemsFilterComponent implements OnInit {
  categoriesFilter = []; // initialize to empty array
  // Decorator that marks a class field as an input property
  // and supplies configuration metadata.
  // https://angular.io/api/core/Input
  @Input() selectedCategory;

  constructor(private filterService: FilterService) {
    // this.categoriesFilter = this.filterService.getAll()
    // .subscribe(category => { this.categoriesFilter = category});
    this.filterService.getAll().subscribe((categories) => {
      this.categoriesFilter.push(...categories);
    });
  }

  ngOnInit(): void {
  }

}
