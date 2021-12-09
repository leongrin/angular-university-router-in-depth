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
      first(), // This observable is long-running; it doesn't complete by itself. So we are going to force the completion after the
      // emission of the first value. This will allow the routing transition operation to be concluded. Meaning that the user will be
      // able to see the target screen, or be denied access.
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
