import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$: Observable<any> = this.userSubject.asObservable();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.userSubject.next(JSON.parse(savedUser));
    }
  }

  get appUser$(): Observable<AppUser> {
    return this.user$ as Observable<AppUser>;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    // Mock login: always logs in as an admin for development purposes
    const mockUser: AppUser = {
      name: 'Admin User',
      email: 'admin@example.com',
      isAdmin: true
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    this.userSubject.next(mockUser);

    this.router.navigateByUrl(returnUrl);
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }
}
