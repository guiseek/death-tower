import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { GameState, PlayerState } from './+state';
import { AppComponent } from './app.component';

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
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: GameState,
      useFactory: () => {
        return new GameState();
      },
    },
    {
      provide: PlayerState,
      useFactory: () => {
        return new PlayerState();
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
