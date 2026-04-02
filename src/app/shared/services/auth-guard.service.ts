import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
// https://angular.io/api/router/CanActivate
// a CanActivate function that checks whether the current user has
// permission to activate the requested route.
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }
  // https://vsavkin.com/angular-router-understanding-router-state-7b5b95a12eab
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.auth.user$.pipe(map(user => {
      if(user) {
        return true;
      }

      this.router.navigate(['/login'], { queryParams: {returnUrl: state.url}});
      return false;

    }));
  }

}
