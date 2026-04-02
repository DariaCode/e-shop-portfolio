import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Item } from '../models/item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemsSubject = new BehaviorSubject<Item[]>([]);
  items$: Observable<Item[]> = this.itemsSubject.asObservable();

  constructor() {
    const savedItems = localStorage.getItem('items');
    if (savedItems) {
      this.itemsSubject.next(JSON.parse(savedItems));
    }
  }

  getAll(): Observable<Item[]> {
    return this.items$;
  }

  create(item: any) {
    const currentItems = this.itemsSubject.getValue();
    const newItem = { ...item, key: Date.now().toString() };
    const updatedItems = [...currentItems, newItem];
    this.saveItems(updatedItems);
    return of(newItem);
  }

  get(itemId: string): Observable<Item> {
    return this.items$.pipe(
      map(items => items.find(i => i.key === itemId))
    );
  }

  update(itemId: string, item: any) {
    const currentItems = this.itemsSubject.getValue();
    const index = currentItems.findIndex(i => i.key === itemId);
    if (index !== -1) {
      currentItems[index] = { ...item, key: itemId };
      this.saveItems(currentItems);
    }
    return of(currentItems[index]);
  }

  delete(itemId: string) {
    const currentItems = this.itemsSubject.getValue();
    const updatedItems = currentItems.filter(i => i.key !== itemId);
    this.saveItems(updatedItems);
    return of(true);
  }

  private saveItems(items: Item[]) {
    localStorage.setItem('items', JSON.stringify(items));
    this.itemsSubject.next(items);
  }
}
