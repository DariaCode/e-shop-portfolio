import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// My services:
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService  {

  constructor(
    private auth: AuthService,
    private userService: UserService
  ) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map( appUser => appUser.isAdmin )
    );
  }
}
