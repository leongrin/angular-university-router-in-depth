import { Injectable } from '@angular/core';
import {CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthStore} from './auth.store';
import {first, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanLoadAuthGuard implements CanLoad {

  constructor(private authServ: AuthStore,
              private router: Router) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authServ.isLoggedIn$.pipe(
      first(),
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
