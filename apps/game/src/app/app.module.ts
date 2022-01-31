import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import {
  CUSTOM_CONFIG,
  DEFAULT_CONFIG,
  PLAYER_FRAMES_CONFIG,
} from '@death-tower/stage/tower';

import {
  CUSTOM_CONFIG_VALUE,
  DEFAULT_CONFIG_VALUE,
  FRAMES_CONFIG_VALUE,
} from './config/animation-frames';

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
      provide: DEFAULT_CONFIG,
      useValue: DEFAULT_CONFIG_VALUE,
    },
    {
      provide: CUSTOM_CONFIG,
      useValue: CUSTOM_CONFIG_VALUE,
    },
    {
      provide: PLAYER_FRAMES_CONFIG,
      useValue: FRAMES_CONFIG_VALUE,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
