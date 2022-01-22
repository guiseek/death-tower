import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// import {
//   ANIMATION_FRAMES_TOKEN,
//   ANIMATION_FRAMES_VALUE,
// } from './config/animation-frames';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('./pages/pages.module').then((m) => m.PagesModule),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [
    // {
    //   provide: ANIMATION_FRAMES_TOKEN,
    //   useValue: ANIMATION_FRAMES_VALUE,
    // },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
