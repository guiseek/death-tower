import { CustomConfig } from '../interfaces/config'

export const customConfig: CustomConfig = {
  platforms: [],
  openings: [],
  savedState: null,
  state: {
    paused: false,
    finished: false,
    points: 0,
    lastPlatform: null,
    platformReached: null,
    titles: {
      opacity: 0,
      ready: false,
      text: 'Não foi desta vez',
    },
    climbstarted: false,
    time: null,
    dt: null,
    climbspeed: {
      normal: 0.05,
      fast: 0.12,
    },
    pos: {
      x: 1510,
      y: 0
    },
    lastPos: {
      x: 1510,
      y: 0
    },
    activePlatforms: [],
    jump: {
      isGrounded: true,
      isJumping: false,
      isBoosting: false,
      speed: 0,
      nextY: 0,
    },
    player: {
      dir: 1,
      x: 725,
      y: 350,
      prevY: 350,
      speed: 0,
      animationFrame: 0,
      animationFrameCount: 0,
    },
  },
}

export function loadCustomConfig(config: Partial<CustomConfig> = {}): CustomConfig {
  return { ...customConfig, ...config }
}
