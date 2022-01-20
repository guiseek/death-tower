import { StateConfig } from './../interfaces/config'
import { Platform } from './platforms/platform'

export function checkPoint(state: StateConfig, platform: Platform) {
  if (state.lastPlatform && platform.n > state.lastPlatform.n) {
    state.lastPlatform = platform
    const speed = (state.player.speed * -1) * 1000    
    state.points = platform.n * speed
  }
}
