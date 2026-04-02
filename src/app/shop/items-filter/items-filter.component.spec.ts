import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsFilterComponent } from './items-filter.component';
import { FilterService } from '../../shared/services/filter.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';;
import { By } from '@angular/platform-browser';

// Define a mock FilterService that returns an observable of categories
const mockFilterService = {
  getAll: () => of([
      { key: 'category1', payload: { val: () => ({ name: 'Category 1' }) } },
      { key: 'category2', payload: { val: () => ({ name: 'Category 2' }) } },
    ])
};

describe('ItemsFilterComponent', () => {
  let component: ItemsFilterComponent;
  let fixture: ComponentFixture<ItemsFilterComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsFilterComponent ],
      providers: [
        { provide: FilterService, useValue: mockFilterService } // Use the mock FilterService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsFilterComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.css('.myList'));
    htmlElement = debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch categories on init', () => {
    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.categoriesFilter[0].key).toEqual('category1');
    expect(component.categoriesFilter[1].key).toEqual('category2');
  });

  it('should display categories', () => {
    fixture.detectChanges();

    const categoryLinks = htmlElement.querySelectorAll('.list-group-item');
    expect(categoryLinks.length).toEqual(3); // 2 categories + "All Categories" link

    const firstCategoryLink = categoryLinks[1];
    expect(firstCategoryLink.textContent).toContain('Category 1');
  });


  it('should set selectedCategory', () => {
    const selectedCategory = 'category1';
    component.selectedCategory = selectedCategory;

    fixture.detectChanges();

    const selectedCategoryLink = htmlElement.querySelector('.active');
    expect(selectedCategoryLink.textContent.trim()).toEqual('Category 1');
  });

});

