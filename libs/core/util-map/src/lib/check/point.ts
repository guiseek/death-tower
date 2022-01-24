import { Platform, StateConfig } from '@death-tower/core/interfaces';

export function isItANewPlatform(current: Platform, last: Platform | null) {
  return last && current.n > last.n
}

export function checkPoint(state: StateConfig, platform: Platform) {
  if (isItANewPlatform(platform, state.lastPlatform)) {
    state.lastPlatform = platform;
    state.score = platform.n * (state.player.speed * -1 * 1000);
  }
}
