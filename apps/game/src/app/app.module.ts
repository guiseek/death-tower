import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import {
  // RADIO_CONFIG,
  SOUND_CONFIG,
  CUSTOM_CONFIG,
  DEFAULT_CONFIG,
  PLAYER_FRAMES_CONFIG,
} from '@death-tower/stage/tower';
import { RADIO_CONFIG } from '@death-tower/stage/ui-radio';

import {
  SOUND_CONFIG_VALUE,
  RADIO_CONFIG_VALUE,
  CUSTOM_CONFIG_VALUE,
  DEFAULT_CONFIG_VALUE,
  FRAMES_CONFIG_VALUE,
} from './config';

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
      provide: SOUND_CONFIG,
      useValue: SOUND_CONFIG_VALUE,
    },
    {
      provide: RADIO_CONFIG,
      useValue: RADIO_CONFIG_VALUE,
    },
    {
      provide: PLAYER_FRAMES_CONFIG,
      useValue: FRAMES_CONFIG_VALUE,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
