import { TestBed } from '@angular/core/testing';
import { FilterService } from './filter.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';

class FirebaseMock {
  categories = [
    { key: 'Bean Head', name: 'Bean Head' },
    { key: 'Kicking Horse', name: 'Kicking Horse' },
    { key: 'Starbucks', name: 'Starbucks' },
  ];

  list(path: string, queryFn?: (ref: any) => any) {
    const items = (path === 'categories') ? this.categories : [];;
      return {
        valueChanges: () => of(items),
        snapshotChanges: () =>
          of(
            items.map((item: any) => ({
              payload: {
                key: item.key,
                val: () => item
              }
            }))
          ),
        update: (key: string, value: any) => Promise.resolve(),
        remove: (key: string) => Promise.resolve(),
        push: (value: any) =>
          Promise.resolve({
            key: Math.random()
          })
      };
  }
};

describe('FilterService', () => {
  let service: FilterService;
  let firebaseMock: FirebaseMock;

  beforeEach(() => {
    firebaseMock = new FirebaseMock();
    TestBed.configureTestingModule({
      providers: [
        FilterService,
        { provide: AngularFireDatabase, useValue: firebaseMock },
      ],
    });
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call firebase.list and returns an array of length 3', () => {
    service.getAll().subscribe(data =>{
      expect(data.length).toEqual(3);
    });
  });

  it('should call getAll method and matches keys with expected values', () => {
    service.getAll().subscribe(data =>{
      expect(data[0].payload.key).toBe('Bean Head');
      expect(data[1].payload.key).toBe('Kicking Horse');
      expect(data[2].payload.key).toBe('Starbucks');
    });
  });
});
