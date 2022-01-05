import { Platform } from '../map/platforms/platform'
import { Door } from '../map/doors/door'

export interface Arch {
  container: HTMLElement | null
  canvas: HTMLCanvasElement | null
  ctx: CanvasRenderingContext2D | null
  rect: DOMRect | null
  platforms: Platform[]
  openings: Door[]
  brick: {
    shine: string
    shade: string
    color: string
    width: number
    height: number
    padding: number
  }
  platform: {
    height: number
    width: number
    color: string
  }
  tower: {
    width: number
    shadowWidth: number
    skyWidth: number
  }
  sky: {
    bg: string
    starSizes: number[]
    starColors: string[]
  }
  colors: {
    bg: string
    wood1: string
    wood2: string
    wood3: string
    wood4: string
    wood5: string
  }
  settings: {
    maxSpeed: number
    minSpeed: number
    friction: number
    acceleration: number
    jump: {
      gravity: {
        boost: number
        normal: number
        down: number
      }
      maxSpeed: number
      fallStartSpeed: number
      friction: number
    }
  }
  storage: {
    bricks: Record<string, HTMLCanvasElement> | null
    sky: HTMLCanvasElement | null
    shadows: HTMLCanvasElement | null
  }
  input: {
    left: boolean
    right: boolean
    jump: boolean
  }
  animationFrames: {
    standing: HTMLCanvasElement[]
    jumpingUp: HTMLCanvasElement[]
    jumpingDown: HTMLCanvasElement[]
    runningLeft: HTMLCanvasElement[]
    runningRight: HTMLCanvasElement[]
  }
  savedState: null
  state: {
    paused: boolean
    titles: {
      opacity: number
      ready: boolean
      text: string
    }
    climbstarted: boolean
    time: number | null
    dt: number | null
    climbspeed: {
      normal: number
      fast: number
    }
    pos: {
      x: number
      y: number
    }
    activePlatforms: Platform[]
    jump: {
      isGrounded: boolean
      isJumping: boolean
      isBoosting: boolean
      speed: number
      nextY: number
    }
    player: {
      dir: number
      x: number
      y: number
      prevY: number
      speed: number
      animationFrame: number
      animationFrameCount: number
    }
  }
}
