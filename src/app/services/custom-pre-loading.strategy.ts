import {PreloadingStrategy, Route} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';

Injectable({
  providedIn: 'root'  // it doesn't help. It needs to be added on the provider list of the module.
});

export class CustomPreLoadingStrategy implements PreloadingStrategy {

  preload(route: Route, load: () => Observable<any>): Observable<any> {

    if (route.data.preload) {
      return load();
    } else {
      return of(null);
    }

  }
}
