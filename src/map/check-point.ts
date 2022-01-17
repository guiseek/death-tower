import { StateConfig } from './../interfaces/config'
import { Platform } from './platforms/platform'

export function checkPoint(state: StateConfig, platform: Platform) {
  if (state.lastPlatform && platform.n > state.lastPlatform.n) {
    state.lastPlatform = platform
    state.points += (10 * platform.n)
  }
}
