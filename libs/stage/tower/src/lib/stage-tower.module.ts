import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';

import {
  GameState,
  PlayerState,
  LevelDataRepository,
} from '@death-tower/stage/data-access';
import { LevelRepository } from '@death-tower/stage/domain';
import { StageUiMapModule } from '@death-tower/stage/ui-map';
import { StageUiRadioModule } from '@death-tower/stage/ui-radio';

import { TowerComponent } from './containers/tower/tower.component';


@NgModule({
  imports: [
    MatSnackBarModule,

    StageUiMapModule,
    StageUiRadioModule,

    CommonModule,
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
  ],
})
export class StageTowerModule {}
