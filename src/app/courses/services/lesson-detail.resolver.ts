import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {LessonDetail} from '../model/lesson-detail';
import {CoursesService} from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class LessonDetailResolver implements Resolve<LessonDetail> {
  constructor(private courseServ: CoursesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LessonDetail> {

    /*const courseUrl = route.parent.params.slug;*/ // I case the Router config paramsInheritanceStrategy: 'always' is not set.
    const courseUrl = route.params.slug;
    const lessonSeqNo = route.params.lessonNumb;

    console.log(`Inside LessonDetailResolver: courseUrl => ${courseUrl} and lessonSeqNo => ${lessonSeqNo}`);

    return this.courseServ.loadLessonDetail(courseUrl, lessonSeqNo);
  }
}
