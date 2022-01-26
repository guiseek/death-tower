import { PlayerAction } from '@death-tower/core/util-config';
import { InjectionToken } from '@angular/core';

export type PlayerFramesConfig = [string, PlayerAction, number, boolean][];

export const PLAYER_FRAMES_CONFIG = new InjectionToken<PlayerFramesConfig>(
  'player-frames.config'
);
