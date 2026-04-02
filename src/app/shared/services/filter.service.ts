import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private defaultCategories = [
    { key: 'BeanHead', name: 'Bean Head' },
    { key: 'KickingHorse', name: 'Kicking Horse' },
    { key: 'Lavazza', name: 'Lavazza' },
    { key: 'Melitta', name: 'Melitta' },
    { key: 'Starbucks', name: 'Starbucks' },
    { key: 'TimHortons', name: 'Tim Hortons' }
  ];

  constructor() { }

  getAll(): Observable<any[]> {
    return of(this.defaultCategories.map(c => ({
      key: c.key,
      payload: { val: () => ({ name: c.name }) }
    })));
  }
}
