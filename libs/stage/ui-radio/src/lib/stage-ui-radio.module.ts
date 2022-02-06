import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

import { PlayerComponent } from './player/player.component';
import { TimePipe } from './pipes/time.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatSliderModule,
  ],
  declarations: [
    PlayerComponent,
    TimePipe
  ],
  exports: [
    PlayerComponent
  ],
})
export class StageUiRadioModule {}
