import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonDetail} from '../model/lesson-detail';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'lesson',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {

  lesson$: Observable<LessonDetail>;

  constructor(private route: ActivatedRoute,
              private router: Router) {

    console.log('Created LessonDetailComponent...');

  }

  ngOnInit() {
    this.lesson$ = this.route.data.pipe(
      map(data => data.lessonDetail)  // lessonDetail is coming from the resolve on the courses-routing.module.ts
    );

  }

  previous(lesson: LessonDetail) {
    this.router.navigate(['lessons', lesson.seqNo - 1], {relativeTo: this.route.parent});
  }

  next(lesson: LessonDetail) {
    this.router.navigate(['lessons', lesson.seqNo + 1], {relativeTo: this.route.parent});
  }

}
