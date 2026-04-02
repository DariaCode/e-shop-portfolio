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

  private seedData: Item[] = [
    { key: '1', title: 'Bean Head Organic & Mould Free Coffee, Ground', price: 13.99, category: 'BeanHead', imageUrl: '/assets/img/Bean Head Organic & Mould Free Coffee, Ground 13.99.png' },
    { key: '2', title: 'Bean Head Organic & Mould Free Coffee, Whole Beans', price: 13.99, category: 'BeanHead', imageUrl: '/assets/img/Bean Head Organic & Mould Free Coffee, Whole Beans 13.99.png' },
    { key: '3', title: 'Kicking Horse Coffee 454 Horse Power Roast Coffee', price: 11.99, category: 'KickingHorse', imageUrl: '/assets/img/Kicking Horse Coffee 454 Horse Power Roast Coffee 11.99.png' },
    { key: '4', title: 'Kicking Horse Coffee Cliff Hanger Espresso Roast Coffee', price: 15.99, category: 'KickingHorse', imageUrl: '/assets/img/Kicking Horse Coffee Cliff Hanger Espresso Roast Coffee 15.99.png' },
    { key: '5', title: 'Kicking Horse Coffee Decaf Roast Coffee', price: 15.99, category: 'KickingHorse', imageUrl: '/assets/img/Kicking Horse Coffee Decaf Roast Coffee 15.99.png' },
    { key: '6', title: 'Kicking Horse Coffee Hola Roast Coffee', price: 15.99, category: 'KickingHorse', imageUrl: '/assets/img/Kicking Horse Coffee Hola Roast Coffee 15.99.png' },
    { key: '7', title: 'Kicking Horse Coffee Hoodoo Jo Roast Coffee', price: 15.99, category: 'KickingHorse', imageUrl: '/assets/img/Kicking Horse Coffee Hoodoo Jo Roast Coffee 15.99.png' },
    { key: '8', title: 'Kicking Horse Coffee Kick Ass Roast Coffee', price: 11.99, category: 'KickingHorse', imageUrl: '/assets/img/Kicking Horse Coffee Kick Ass Roast Coffee 11.99.png' },
    { key: '9', title: 'Kicking Horse Coffee Pacific Pipeline Medium Roast Coffee', price: 11.99, category: 'KickingHorse', imageUrl: '/assets/img/Kicking Horse Coffee Pacific Pipeline Medium Roast Coffee 11.99.png' },
    { key: '10', title: 'Kicking Horse Coffee Smart Ass Roast Coffee', price: 15.99, category: 'KickingHorse', imageUrl: '/assets/img/Kicking Horse Coffee Smart Ass Roast Coffee 15.99.png' },
    { key: '11', title: 'Kicking Horse Coffee Three Sisters Roast Coffee', price: 11.99, category: 'KickingHorse', imageUrl: '/assets/img/Kicking Horse Coffee Three Sisters Roast Coffee 11.99.png' },
    { key: '12', title: 'Lavazza DEK Beans', price: 15.99, category: 'Lavazza', imageUrl: '/assets/img/Lavazza_DEK_Beans 15.99.png' },
    { key: '13', title: 'Lavazza Espresso Qualita Oro Beans', price: 35.99, category: 'Lavazza', imageUrl: '/assets/img/Lavazza_Espresso Qualita Oro Beans 35.99.png' },
    { key: '14', title: 'Lavazza Espresso Gran Crema Beans', price: 26.99, category: 'Lavazza', imageUrl: '/assets/img/Lavazza_Espresso_Gran_Crema_Beans 26.99.png' },
    { key: '15', title: 'Lavazza Espresso Rossa Ground Coffee', price: 4.99, category: 'Lavazza', imageUrl: '/assets/img/Lavazza_Espresso_Rossa_Ground_Coffee 4.99.png' },
    { key: '16', title: 'Lavazza Gold Selection Bean Medium Roast Coffee', price: 29.99, category: 'Lavazza', imageUrl: '/assets/img/Lavazza_Gold_Selection_Bean_Medium_Roast_Coffee 29.99.png' },
    { key: '17', title: 'Lavazza Kilimanjaro Drip Coffee', price: 9.99, category: 'Lavazza', imageUrl: '/assets/img/Lavazza_Kilimanjaro Drip Coffee 9.99.png' },
    { key: '18', title: 'Lavazza Super Crema Bean Medium Roast Coffee', price: 29.99, category: 'Lavazza', imageUrl: '/assets/img/Lavazza_Super_Crema_Bean_Medium_Roast_Coffee 29.99.png' },
    { key: '19', title: 'Lavazza Tierra Organic', price: 23.99, category: 'Lavazza', imageUrl: '/assets/img/Lavazza_Tierra_Organic 23.99.png' },
    { key: '20', title: 'Lavazza Top Class Bean Medium Roast Coffee', price: 29.99, category: 'Lavazza', imageUrl: '/assets/img/Lavazza_Top_Class_Bean_Medium_Roast_Coffee 29.99.png' },
    { key: '21', title: 'MELITTA 100 Colombian Whole Bean Coffee', price: 14.99, category: 'Melitta', imageUrl: '/assets/img/MELITTA 100 Colombian Whole Bean Coffee 14.99.png' },
    { key: '22', title: 'MELITTA Dark Roast Espresso Whole Bean Coffee', price: 17.99, category: 'Melitta', imageUrl: '/assets/img/MELITTA Dark Roast Espresso Whole Bean Coffee 17.99.png' },
    { key: '23', title: 'MELITTA Dark Roast Whole Bean Coffee', price: 14.99, category: 'Melitta', imageUrl: '/assets/img/MELITTA Dark Roast Whole Bean Coffee 14.99.png' },
    { key: '24', title: 'MELITTA Hazelnut Crème Whole Bean Coffee', price: 14.99, category: 'Melitta', imageUrl: '/assets/img/MELITTA Hazelnut Crème Whole Bean Coffee 14.99.png' },
    { key: '25', title: 'MELITTA Traditional Medium Roast Coffee', price: 12.99, category: 'Melitta', imageUrl: '/assets/img/MELITTA Traditional Medium Roast Coffee 12.99.png' },
    { key: '26', title: 'Melitta Coffee BellaCrema Espresso, Whole Beans', price: 50.99, category: 'Melitta', imageUrl: '/assets/img/Melitta Coffee BellaCrema Espresso, Whole Beans 50.99.png' },
    { key: '27', title: 'Melitta Coffee BellaCrema LaCrema, Whole Beans', price: 58.99, category: 'Melitta', imageUrl: '/assets/img/Melitta Coffee BellaCrema LaCrema, Whole Beans 58.99.png' },
    { key: '28', title: 'Starbucks Costa Rica Blend Whole Bean Coffee', price: 10.99, category: 'Starbucks', imageUrl: '/assets/img/Starbucks_Costa_Rica_Blend_Whole_Bean_Coffee 10.99.png' },
    { key: '29', title: 'Starbucks French Roast Dark Roast Ground Coffee', price: 10.99, category: 'Starbucks', imageUrl: '/assets/img/Starbucks_French_Roast_Dark_Roast_Ground_Coffee 10.99.png' },
    { key: '30', title: 'Starbucks Kenya Blend Whole Bean Coffee', price: 9.56, category: 'Starbucks', imageUrl: '/assets/img/Starbucks_Kenya_Blend_Whole_Bean_Coffee 9.56.png' },
    { key: '31', title: 'Starbucks Maple Pecan Ground Coffee', price: 10.99, category: 'Starbucks', imageUrl: '/assets/img/Starbucks_Maple_Pecan_Ground_Coffee 10.99.png' },
    { key: '32', title: 'Starbucks Organic French Roast Ground Coffee', price: 9.56, category: 'Starbucks', imageUrl: '/assets/img/Starbucks_Organic_French_Roast_Ground_Coffee 9.56.png' },
    { key: '33', title: 'Starbucks Organic Yukon Ground Coffee', price: 9.56, category: 'Starbucks', imageUrl: '/assets/img/Starbucks_Organic_Yukon_Ground_Coffee 9.56.png' },
    { key: '34', title: 'Starbucks Pike Place Roast Ground Coffee', price: 17.99, category: 'Starbucks', imageUrl: '/assets/img/Starbucks_Pike_Place_Roast_Ground_Coffee 17.99.png' },
    { key: '35', title: 'Starbucks True North Blend Ground Coffee', price: 17.99, category: 'Starbucks', imageUrl: '/assets/img/Starbucks_True_North_Blend_Ground_Coffee 17.99.png' },
    { key: '36', title: 'Starbucks Verona Ground Coffee', price: 17.99, category: 'Starbucks', imageUrl: '/assets/img/Starbucks_Verona_Ground_Coffee 17.99.png' },
    { key: '37', title: 'Tim Hortons Espresso Dark Roast Coffee', price: 6.99, category: 'TimHortons', imageUrl: '/assets/img/Tim Hortons Espresso Dark Roast Coffee 6.99.png' },
    { key: '38', title: 'Tim Hortons Original Blend, Fine Grind Coffee', price: 16.99, category: 'TimHortons', imageUrl: '/assets/img/Tim Hortons Original Blend, Fine Grind Coffee 16.99.png' },
    { key: '39', title: 'Tim Hortons Original Medium Roast Coffee', price: 6.99, category: 'TimHortons', imageUrl: '/assets/img/Tim Hortons Original Medium Roast Coffee 6.99.png' }
  ];

  constructor() {
    this.initItems();
  }

  private initItems() {
    const savedItems = localStorage.getItem('items');
    if (savedItems && JSON.parse(savedItems).length > 0) {
      this.itemsSubject.next(JSON.parse(savedItems));
    } else {
      // Overwrite local storage with seed data if currently empty or outdated.
      // This is helpful for the first release of the Local Storage version.
      this.saveItems(this.seedData);
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
