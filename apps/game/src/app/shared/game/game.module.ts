import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ScoreComponent } from './score/score.component';
import { TimerComponent } from '../game/timer/timer.component';
import { ButtonComponent } from './button/button.component';


@NgModule({
  declarations: [
    ButtonComponent,
    TimerComponent,
    ScoreComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ButtonComponent,
    TimerComponent,
    ScoreComponent
  ],
})
export class GameModule { }
