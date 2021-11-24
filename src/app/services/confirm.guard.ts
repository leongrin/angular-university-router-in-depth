import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CourseComponent} from '../courses/course/course.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: CourseComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return component.confirmExit();
  }

}
