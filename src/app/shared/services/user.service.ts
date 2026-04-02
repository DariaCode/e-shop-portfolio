import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AppUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<AppUser[]>([]);
  users$: Observable<AppUser[]> = this.usersSubject.asObservable();

  constructor() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.usersSubject.next(JSON.parse(savedUsers));
    }
  }

  save(user: any) {
    const currentUsers = this.usersSubject.getValue();
    const index = currentUsers.findIndex(u => u.email === user.email);
    if (index !== -1) {
      currentUsers[index] = user;
    } else {
      currentUsers.push(user);
    }
    this.saveUsersToStorage(currentUsers);
  }

  get(uid: string): Observable<any> {
    const currentUsers = this.usersSubject.getValue();
    const user = currentUsers.find(u => (u as any).uid === uid);
    return of({ valueChanges: () => of(user) });
  }

  private saveUsersToStorage(users: AppUser[]) {
    localStorage.setItem('users', JSON.stringify(users));
    this.usersSubject.next(users);
  }
}
