import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {LessonSummary} from '../model/lesson-summary';
import {CoursesService} from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class LessonsResolver implements Resolve<LessonSummary[]> {
  constructor(private coursesServ: CoursesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LessonSummary[]> {

    /*const lessonSlug = route.paramMap.get('slug');*/
    const lessonSlug = route.params.slug;

    console.log(`Inside LessonsResolver => ${lessonSlug}`);

    return this.coursesServ.loadAllCourseLessonsSummary(lessonSlug);
  }
}
