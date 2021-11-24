import {NgModule} from '@angular/core';
import {NoPreloading, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AboutComponent} from './about/about.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CanLoadAuthGuard} from './services/can-load-auth.guard';
import {CustomPreLoadingStrategy} from './services/custom-pre-loading.strategy';
import {ChatComponent} from './chat/chat.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/courses'
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    /*canLoad: [CanLoadAuthGuard],*/
    data: {
      preload: false
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'helpdesk-chat',
    component: ChatComponent,
    outlet: 'chat'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreLoadingStrategy, /*NoPreloading,*/  // the default preloading strategy
      useHash: false,  // When you can't configure the server to serve the index.html only, this config can be useful
      scrollPositionRestoration: 'enabled',  // it needs to always be added. A new page is scrolled to the top, e a back button page
      // maintains the previous scrolling position.
      paramsInheritanceStrategy: 'always',  // very useful, and should be added as default too in a new project. In the angular
      // resolver, you don't need to look for a param like that: route.parent.params.slug. With this config you could only type:
      // route.params.slug;
      relativeLinkResolution: 'corrected',  // Set this at the beginning of every application. It corrects a bug in relative paths.
      malformedUriErrorHandler: (error: URIError, urlSerializer, url) => urlSerializer.parse('page-not-found'), // should always be added
      // to any application. If there is a problem parsing a URL, like a strange character, this function will redirect to the page not
      // found. If this address doesn't exist on routes, the wild route will take care of it and redirect to the page not found component.
      anchorScrolling: 'enabled',  // should always be added to any application
      onSameUrlNavigation: 'reload' // this is an interesting parameter to add, but not necessary on all applications.
    })
  ],
  exports: [RouterModule],
  providers: [
    CustomPreLoadingStrategy
  ]
})
export class AppRoutingModule {


}
