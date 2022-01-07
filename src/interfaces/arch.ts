import { Platform } from '../map/platforms/platform'
import { Door } from '../map/doors/door'

interface Titles {
  opacity: number
  ready: boolean
  text: string
}

interface ClimpSpeed {
  normal: number
  fast: number
}

interface Pos {
  x: number
  y: number
}

interface Jump {
  isGrounded: boolean
  isJumping: boolean
  isBoosting: boolean
  speed: number
  nextY: number
}

interface Player {
  dir: number
  x: number
  y: number
  prevY: number
  speed: number
  animationFrame: number
  animationFrameCount: number
}

export interface GameState {
  points: number
  lastPlatform: Platform | null
  paused: boolean
  titles: Titles
  climbstarted: boolean
  time: number | null
  dt: number | null
  climbspeed: ClimpSpeed
  pos: Pos
  activePlatforms: Platform[]
  jump: Jump
  player: Player
}
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
  state: GameState
}
