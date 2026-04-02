import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private defaultCategories = [
    { key: 'bread', name: 'Bread' },
    { key: 'dairy', name: 'Dairy' },
    { key: 'fruits', name: 'Fruits' },
    { key: 'seasonings', name: 'Seasonings' },
    { key: 'vegetables', name: 'Vegetables' }
  ];

  constructor() { }

  getAll(): Observable<any[]> {
    return of(this.defaultCategories.map(c => ({
      key: c.key,
      payload: { val: () => ({ name: c.name }) }
    })));
  }
}
