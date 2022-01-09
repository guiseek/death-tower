import { StateValue } from './../interfaces/config'
import { Platform } from './platforms/platform'

export function checkPoint(state: StateValue, platform: Platform) {
  if (state.lastPlatform && platform.n > state.lastPlatform.n) {
    state.lastPlatform = platform

    state.points += (10 * platform.n)

    console.log(platform.n);
    
  }
}
