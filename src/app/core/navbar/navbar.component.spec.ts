import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../shared/services/auth.service';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { AppUser } from '../../shared/models/user';
import { ShoppingCart } from '../../shared/models/shopping-cart';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockAuthService: any;
  let mockShoppingCartService: any;

  beforeEach(async () => {
    mockAuthService = {
      appUser$: of({
        name: 'John Doe',
        email: 'john@example.com',
        isAdmin: true
      }), // Mock the appUser$ observable with a test value
      logout: jasmine.createSpy('logout')
    };

    mockShoppingCartService = jasmine.createSpyObj('ShoppingCartService', ['getCart']);

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: ShoppingCartService, useValue: mockShoppingCartService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    // Mock the getCart method of the ShoppingCartService to return an observable of the expected cart object
    const cartItemCount = 3;
    const cart: ShoppingCart = {
      items: [],
      totalItemsCount: cartItemCount,
      totalPrice: 0,
      itemsMap: {}
    };
    (mockShoppingCartService.getCart as jasmine.Spy).and.returnValue(of(cart));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize appUser', () => {
    expect(component.appUser).toEqual({ name: 'John Doe', email: 'john@example.com', isAdmin: true });
  });

  it('should display the app user name or email when logged in', () => {
    const appUser: AppUser = { name: 'John Doe', email: 'johndoe@example.com', isAdmin: false };
    component.appUser = appUser;
    fixture.detectChanges();

    const appUserElement = fixture.debugElement.query(By.css('.navbar-nav .nav-item.dropdown .nav-link'));
    expect(appUserElement.nativeElement.textContent).toContain(appUser.name);
  });

  it('should display the shopping cart item count', async () => {
    spyOn(component, 'ngOnInit').and.callThrough(); // Spy on ngOnInit method
    component.ngOnInit(); // Manually trigger ngOnInit
    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.ngOnInit).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const cartItemCountElement = fixture.debugElement.query(By.css('.navbar-nav .nav-item .badge'));

      expect(cartItemCountElement.nativeElement.textContent.trim()).toBe('3');
    });
  });

  it('should call logout method when logout is clicked', () => {
    component.logout();

    expect(mockAuthService.logout).toHaveBeenCalled();
  });

  it('should call the logout method when the logout link is clicked', () => {
    const logoutLinkElement = fixture.debugElement.query(By.css('.navbar-nav .nav-item.dropdown .dropdown-menu .dropdown-item:last-child'));
    logoutLinkElement.triggerEventHandler('click', null);

    expect(mockAuthService.logout).toHaveBeenCalled();
  });
});
