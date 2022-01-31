import {
  CustomConfig,
  DefaultConfig,
  PlayerFrames,
} from '@death-tower/core/interfaces';
import { InjectionToken } from '@angular/core';

export const CUSTOM_CONFIG = new InjectionToken<CustomConfig>('custom.config');

export const DEFAULT_CONFIG = new InjectionToken<DefaultConfig>(
  'default.config'
);

export const PLAYER_FRAMES_CONFIG = new InjectionToken<PlayerFrames>(
  'player-frames.config'
);
