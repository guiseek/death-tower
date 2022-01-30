import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PLAYER_FRAMES_CONFIG } from '@death-tower/stage/tower';

import { FRAMES_CONFIG_VALUE } from './config/animation-frames';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('@death-tower/stage/tower').then(
              (module) => module.StageTowerModule
            ),
        },
      ],
      { initialNavigation: 'enabledBlocking' }
    ),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: PLAYER_FRAMES_CONFIG,
      useValue: FRAMES_CONFIG_VALUE,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
