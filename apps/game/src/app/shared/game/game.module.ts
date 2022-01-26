import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ScoreComponent } from './score/score.component';
import { TimerComponent } from '../game/timer/timer.component';
import { ButtonComponent } from './button/button.component';
import { NavLevelComponent } from './nav-level/nav-level.component';


@NgModule({
  declarations: [
    ButtonComponent,
    TimerComponent,
    ScoreComponent,
    NavLevelComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    ButtonComponent,
    TimerComponent,
    ScoreComponent,
    NavLevelComponent
  ],
})
export class GameModule { }
