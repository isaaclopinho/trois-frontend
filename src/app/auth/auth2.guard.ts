import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Url } from 'url';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class Auth2Guard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(
      map((user) => {
        const isAuth = !!user;
        if (isAuth) 
          return this.router.createUrlTree(['/passagens']);

        return true;
      })
    );
  }
}
