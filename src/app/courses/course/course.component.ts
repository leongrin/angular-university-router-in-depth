import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course$: Observable<Course>;

  couponCode$: Observable<string>;


  constructor(private route: ActivatedRoute) {


  }

  ngOnInit() {
    this.course$ = this.route.data.pipe(
      map(data => data.course)
    );

    /*this.couponCode = this.route.snapshot.queryParamMap.get('coupon');*/

    this.couponCode$ = this.route.queryParams.pipe(
      map(queryParams => queryParams.coupon)
    );

  }

  confirmExit() {
    return confirm('Are you sure you want t exit this page?');
  }


}











