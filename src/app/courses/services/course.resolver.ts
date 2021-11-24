import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Course} from '../model/course';
import {CoursesService} from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<Course> {

  constructor(private courseServ: CoursesService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    console.log('Inside CourseResolver');

    const courseUrl = route.params.slug;

    return this.courseServ.loadCourseByUrl(courseUrl);
  }
}
