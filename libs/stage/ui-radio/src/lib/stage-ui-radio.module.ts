import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';

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
