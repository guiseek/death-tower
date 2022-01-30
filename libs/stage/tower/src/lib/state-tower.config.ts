import { PlayerFrames } from '@death-tower/core/interfaces';
import { InjectionToken } from '@angular/core';

export const PLAYER_FRAMES_CONFIG = new InjectionToken<PlayerFrames>(
  'player-frames.config'
);
