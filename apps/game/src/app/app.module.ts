import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import {
  ANIMATION_FRAMES_TOKEN,
  ANIMATION_FRAMES_VALUE,
} from './config/animation-frames';

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
      { useHash: true, initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [
    {
      provide: ANIMATION_FRAMES_TOKEN,
      useValue: ANIMATION_FRAMES_VALUE,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
