import { DeathTowerState, keyboardState, playerState } from './state'
import { Config } from './interfaces'
import { Vector2 } from './geometry'
import {
  getPlatformsByPoints,
  drawPlatforms,
  drawShadows,
  drawBricks,
  drawDoors,
  drawTitles,
  drawPlayer,
  loadImage,
  OffScreen,
  checkPoint,
  drawSky,
  keyDown,
  keyUp,
  Door,
  resize,
} from './map'

import positions from './assets/levels/level1.json'

const fallbackCanvas = new OffScreen(10, 10).canvas
const form = document.querySelector('form')
const pointsElement = form!.elements.namedItem('points') as HTMLInputElement

const container = document.querySelector('#container') as HTMLElement
const canvas = document.querySelector('canvas')
const ctx = canvas!.getContext('2d')

const platforms = getPlatformsByPoints(positions)

const config: Config = {
  container,
  canvas,
  ctx,
  rect: null,
  platforms,
  openings: [new Door(1600, 350), new Door(1205, -1160)],
  brick: {
    shine: '',
    shade: 'rgba(256, 256, 256, 0.8)',
    color: '#7C747D',
    width: 16,
    height: 48,
    padding: 4,
  },
  platform: {
    height: 22,
    /* Degrees */
    width: 13,
    color: '#5A4142',
  },
  tower: {
    width: 1200,
    shadowWidth: 130,
    skyWidth: 200,
  },
  sky: {
    bg: 'rgb(10, 10, 10)',
    starSizes: [2, 3, 4, 5],
    starColors: ['#1E728C', '#98ECFF', '#7AEFFF', '#FFF385'],
  },
  colors: {
    bg: '#FBD0D0',
    wood1: '#B5754C',
    wood2: '#CB946D',
    wood3: '#4B3937',
    wood4: '#EB9A67',
    wood5: '#B46736',
  },
  settings: {
    maxSpeed: 0.09,
    minSpeed: 0.01,
    friction: 0.7,
    acceleration: 0.02,
    jump: {
      gravity: {
        boost: 0.0014,
        normal: 0.003,
        down: 0.004,
      },
      maxSpeed: 0.6,
      fallStartSpeed: 0.07,
      friction: 0.98,
    },
  },
  storage: {
    bricks: null,
    sky: null,
    shadows: null,
  },
  input: {
    left: false,
    right: false,
    jump: false,
  },
  animationFrames: {
    standing: [fallbackCanvas, fallbackCanvas],
    jumpingUp: [fallbackCanvas, fallbackCanvas],
    jumpingDown: [fallbackCanvas, fallbackCanvas],
    runningLeft: [
      fallbackCanvas,
      fallbackCanvas,
      fallbackCanvas,
      fallbackCanvas,
    ],
    runningRight: [
      fallbackCanvas,
      fallbackCanvas,
      fallbackCanvas,
      fallbackCanvas,
    ],
  },
  savedState: null,
  state: {
    paused: false,
    finished: false,
    points: 0,
    lastPlatform: null,
    platformReached: platforms[0],
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
    pos: new Vector2(1510, 0),
    lastPos: new Vector2(1510, 0),
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

const state = new DeathTowerState(config.state)

function loadAssets() {
  const standing = new URL(
    'assets/player/zumbi/state=standing.svg',
    import.meta.url
  )
  const jumping = new URL(
    'assets/player/zumbi/state=jumping.svg',
    import.meta.url
  )
  const jumpingdown = new URL(
    'assets/player/zumbi/state=jumpingdown.svg',
    import.meta.url
  )
  const running = new URL(
    'assets/player/zumbi/state=running.svg',
    import.meta.url
  )
  const walking = new URL(
    'assets/player/zumbi/state=walking.svg',
    import.meta.url
  )

  loadImage(config, standing.pathname, 'standing', 0, false)
  loadImage(config, standing.pathname, 'standing', 1, true)
  loadImage(config, jumping.pathname, 'jumpingUp', 0, false)
  loadImage(config, jumping.pathname, 'jumpingUp', 1, true)
  loadImage(config, jumpingdown.pathname, 'jumpingDown', 0, false)
  loadImage(config, jumpingdown.pathname, 'jumpingDown', 1, true)
  loadImage(config, running.pathname, 'runningLeft', 0, false)
  loadImage(config, running.pathname, 'runningLeft', 1, false)
  loadImage(config, walking.pathname, 'runningLeft', 2, false)
  loadImage(config, walking.pathname, 'runningLeft', 3, false)
  loadImage(config, running.pathname, 'runningRight', 0, true)
  loadImage(config, running.pathname, 'runningRight', 1, true)
  loadImage(config, walking.pathname, 'runningRight', 2, true)
  loadImage(config, walking.pathname, 'runningRight', 3, true)
}


function loadAudios() {
  const thunder = new Audio(
    new URL('assets/sound/thunder-rumble.mp3', import.meta.url).pathname
  )
  const yeaah = new Audio(
    new URL('assets/sound/zumbi/yeaah.mp3', import.meta.url).pathname
  )
  const running = new Audio(
    new URL('assets/sound/running.mp3', import.meta.url).pathname
  )
  const jumpUp = new Audio(
    new URL('assets/sound/jump-up.mp3', import.meta.url).pathname
  )
  const jumpDown = new Audio(
    new URL('assets/sound/jump-down.mp3', import.meta.url).pathname
  )
  const tiger = new Audio(
    new URL('assets/sound/zumbi/tiger.mp3', import.meta.url).pathname
  )
  const blood = new Audio(
    new URL('assets/sound/zumbi/blood.mp3', import.meta.url).pathname
  )
  const scream = new Audio(
    new URL('assets/sound/zumbi/scream.mp3', import.meta.url).pathname
  )
  const devoured = new Audio(
    new URL('assets/sound/zumbi/devoured.mp3', import.meta.url).pathname
  )

  thunder.loop = true
  running.loop = true

  return {
    thunder,
    yeaah,
    running,
    jumpUp,
    jumpDown,
    tiger,
    blood,
    scream,
    devoured,
  }
}

const audio = loadAudios()

let dead = false
function draw() {
  const now = document.timeline.currentTime ?? 0
  config.state.dt = now - (config.state.time || now)
  config.state.time = now

  if (!config.state.paused) {
    doCalculations()
  }

  if (!config.state.lastPlatform) {
    config.state.lastPlatform = config.platforms[0]
    dead = false
  }

  if (!config.state.paused && config.state.titles.opacity !== 100) {
    drawSky(config)
    drawPlatforms(config, false)
    drawBricks(config)
    drawDoors(config)
    drawShadows(config)
    drawPlatforms(config, true)
    drawPlayer(config)
  }

  if (config.state.paused) {
    drawTitles(config)
    if (!dead) {
      audio.scream.play()
      dead = true
    }
  }
  requestAnimationFrame(draw)
}

function doCalculations() {
  if (config.input.left) {
    config.state.player.speed += config.settings.acceleration
  } else if (config.input.right) {
    config.state.player.speed -= config.settings.acceleration
  } else if (config.state.player.speed !== 0) {
    config.state.player.speed *= config.state.jump.isJumping
      ? config.settings.jump.friction
      : config.settings.friction
  }

  if (Math.abs(config.state.player.speed) > config.settings.maxSpeed) {
    config.state.player.speed =
      config.state.player.speed > 0
        ? config.settings.maxSpeed
        : -1 * config.settings.maxSpeed
  } else if (Math.abs(config.state.player.speed) < config.settings.minSpeed) {
    playerState.idle()
    state.player({ speed: 0 })

    config.state.player.speed = 0
  }

  if (config.state.player.speed !== 0) {
    if (!config.state.jump.isJumping) {
      playerState.run()
    }

    const currentSpeed = config.state.jump.isJumping
      ? config.state.player.speed * 0.7
      : config.state.player.speed

    config.state.pos.x +=
      config.state.player.speed < 0
        ? Math.ceil(currentSpeed * (config.state.dt as number))
        : Math.floor(currentSpeed * (config.state.dt as number))

    config.state.player.dir = currentSpeed > 0 ? 0 : 1
    state.player(config.state.player)
  }

  if (!config.state.climbstarted && config.input.jump) {
    config.state.climbstarted = true
  }

  if (config.input.jump || config.state.jump.isJumping) {
    if (config.state.jump.isGrounded) {
      playerState.jumpUp()
      playerState.idle()

      config.state.jump.isGrounded = false
      config.state.jump.isJumping = true
      config.state.jump.isBoosting = true
      config.state.jump.speed = config.settings.jump.maxSpeed
    }

    if (config.state.jump.isJumping) {
      const upwards = config.state.jump.speed > 0
      const adjust =
        (config.state.dt as number) < 30 ? 30 - (config.state.dt as number) : 0 // .·´¯`(>▂<)´¯`·.

      if (!upwards && config.state.jump.isBoosting) {
        config.state.jump.isBoosting = false
      }

      config.state.player.prevY = config.state.player.y
      config.state.player.y -=
        config.state.jump.speed * (config.state.dt as number)
      config.state.jump.speed -=
        (config.settings.jump.gravity[
          upwards ? (config.state.jump.isBoosting ? 'boost' : 'normal') : 'down'
        ] -
          adjust * 0.00002) *
        (config.state.dt as number)
    }
  }

  if (config.state.jump.isBoosting && !config.input.jump) {
    config.state.jump.isBoosting = false
  }

  if (config.state.climbstarted && config.state.pos.y < 1440) {
    config.state.pos.y +=
      (config.state.player.y + config.state.pos.y < 250
        ? config.state.climbspeed.fast
        : config.state.climbspeed.normal) * (config.state.dt as number)
  }

  collisionDetection()

  if (config.state.player.y + config.state.pos.y > 900) {
    playerState.idle()

    config.state.paused = true
  }

  state.setState(config.state)
}

function collisionDetection() {
  if (config.state.jump.isJumping && config.state.jump.speed < 0) {
    for (let i = 0; i < config.state.activePlatforms.length; i++) {
      const platform = config.state.activePlatforms[i]

      if (Math.abs(platform.x - (config.state.pos.x + 90)) < 10) {
        const playerFloor = config.state.player.y + 250
        const playerFloorPrev = config.state.player.prevY + 250

        if (playerFloor > platform.y && playerFloorPrev < platform.y) {
          playerState.jumpDown()
          playerState.idle()

          state.jump({
            isGrounded: true,
            isJumping: false,
            isBoosting: false,
            speed: 0,
          })
          state.player({ y: platform.y - 250 })

          config.state.player.y = platform.y - 250
          config.state.jump.isGrounded = true
          config.state.jump.isJumping = false
          config.state.jump.isBoosting = false
          config.state.jump.speed = 0
        }
      }
    }
  } else if (config.state.jump.isGrounded) {
    let groundToStandOnFound = false

    for (let i = 0; i < config.state.activePlatforms.length; i++) {
      let platform = config.state.activePlatforms[i]

      if (Math.abs(platform.x - (config.state.pos.x + 90)) < 10) {
        /**
         * Parou em uma plataforma posterior a última
         * em que seus pontos foram calculados
         */
        checkPoint(config.state, platform)

        pointsElement.value = (config.state.points | 0).toString()

        if (platform.y - (config.state.player.y + 250) === 0) {
          groundToStandOnFound = true

          break
        }
      }
    }

    if (!groundToStandOnFound) {
      playerState.jumpUp()

      config.state.jump.isGrounded = false
      config.state.jump.isJumping = true
      config.state.jump.isBoosting = true
      config.state.jump.speed = config.settings.jump.fallStartSpeed
    }
  } else {
    config.openings.forEach((door) => checkDoor(config, door))
  }
}

function checkDoor(config: Config, door: Door) {
  if (Math.abs(door.x - (config.state.pos.x + 40)) < 10) {
    if (!config.state.finished) {
      audio.yeaah.play()
      config.state.finished = true
    }
  }
}

resize(config)

window.addEventListener('resize', () => resize(config))

if (!config.savedState) {
  config.savedState = JSON.parse(JSON.stringify(config.state))
}

loadAssets()

draw()

window.addEventListener('keydown', (e) => keyDown(config, e), false)
window.addEventListener('keyup', (e) => keyUp(config, e), false)

keyboardState.initialize()

let initialized = false

playerState.jumping$.subscribe((jumping: boolean) => {
  if (!jumping) {
    audio.jumpDown.play()
    audio.jumpUp.pause()
  }

  if (jumping) {
    audio.jumpUp.play()
    audio.jumpDown.pause()
  }
})

playerState.running$.subscribe((running: boolean) => {
  if (!initialized && running) {
    audio.thunder.play()
    initialized = true
  }

  if (!running) {
    audio.running.pause()
  }

  if (running) {
    audio.running.play()
  }
})
