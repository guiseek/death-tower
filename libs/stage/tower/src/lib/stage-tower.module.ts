import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { TowerComponent } from './containers/tower/tower.component';
import { ScoreComponent } from './components/score/score.component';
import { TimerComponent } from './components/timer/timer.component';
import { MenuItemComponent } from './components/menu/menu-item.component';
import { ButtonComponent } from './components/button/button.component';
import { MenuComponent } from './components/menu/menu.component';
import { SliderComponent } from './components/slider/slider.component';
import { TipsComponent } from './components/tips/tips.component';
import { SettingsComponent } from './components/settings/settings.component';

import { TipsService } from './components/tips/tips.service';
import { SettingsService } from './components/settings/settings.service';
import { TowerLevelRepository } from '@death-tower/stage/data-access';
import { GameState, PlayerState } from '@death-tower/stage/data-access';

@NgModule({
  imports: [
    CommonModule,
    MatSliderModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: ':level',
        component: TowerComponent,
      },
      {
        path: '**',
        redirectTo: 'training',
      },
    ]),
  ],
  declarations: [
    TowerComponent,
    ButtonComponent,
    TimerComponent,
    ScoreComponent,
    MenuComponent,
    MenuItemComponent,
    SliderComponent,
    TipsComponent,
    SettingsComponent,
  ],
  providers: [
    {
      provide: TowerLevelRepository,
      useClass: TowerLevelRepository,
    },
    {
      provide: PlayerState,
      useClass: PlayerState,
    },
    {
      provide: GameState,
      useFactory: (repo: TowerLevelRepository) => {
        return new GameState(repo);
      },
      deps: [TowerLevelRepository],
    },
    SettingsService,
    TipsService,
  ],
})
export class StageTowerModule {}
