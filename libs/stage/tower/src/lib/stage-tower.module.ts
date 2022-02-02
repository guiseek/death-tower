import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { TowerComponent } from './containers/tower/tower.component';
import { MenuItemComponent } from './components/menu/menu-item.component';
import { ButtonComponent } from './components/button/button.component';
import { MenuComponent } from './components/menu/menu.component';
import { SliderComponent } from './components/slider/slider.component';
import { TipsComponent } from './components/tips/tips.component';
import { SettingsComponent } from './components/settings/settings.component';

import { TipsService } from './components/tips/tips.service';
import { SettingsService } from './components/settings/settings.service';
import { GameState, PlayerState } from '@death-tower/stage/data-access';
import { LevelDataRepository } from '@death-tower/stage/data-access';
import { LevelRepository } from '@death-tower/stage/domain';
import { ValueComponent } from './components/value/value.component';

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
    MenuComponent,
    MenuItemComponent,
    SliderComponent,
    TipsComponent,
    SettingsComponent,
    ValueComponent,
  ],
  providers: [
    {
      provide: LevelRepository,
      useClass: LevelDataRepository,
    },
    {
      provide: PlayerState,
      useClass: PlayerState,
    },
    {
      provide: GameState,
      useFactory: (repo: LevelRepository) => {
        return new GameState(repo);
      },
      deps: [LevelRepository],
    },
    SettingsService,
    TipsService,
  ],
})
export class StageTowerModule {}
