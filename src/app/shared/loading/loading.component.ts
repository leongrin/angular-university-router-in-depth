import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LoadingService} from './loading.service';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router
} from '@angular/router';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  @Input()
  routing = false;

  @Input()
  detectRoutingOngoing = false;

  constructor(public loadingService: LoadingService,
              private router: Router) {

  }

  ngOnInit() {
    /*THIS CODE ONLY WORKS IN CASE OF RESOLVERS OR LAZY LOADING COMPONENTS*/
    /*if (this.detectRoutingOngoing) {*/
      this.router.events.subscribe(event => {
        if (
          event instanceof NavigationStart ||
          event instanceof RouteConfigLoadStart  // detects the lazy loading of a module
        ) {
          this.loadingService.loadingOn();
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationError ||
          event instanceof NavigationCancel ||
          event instanceof RouteConfigLoadEnd   // detects the end of the lazy loading of a module
        ) {
          this.loadingService.loadingOff();
        }
      });
    /*}*/

  }


}
