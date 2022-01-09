import { loadDefaultConfig, loadCustomConfig, loadDomConfig } from './config'
import { DeathTowerState, keyboardState, playerState } from './state'
import { audio } from './providers/audio'
import { Config } from './interfaces'
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

const container = document.querySelector('#container') as HTMLElement
const canvas = document.querySelector('canvas') as HTMLCanvasElement
const fallbackCanvas = new OffScreen(10, 10).canvas

const defaultConfig = loadDefaultConfig()
const domConfig = loadDomConfig(container, canvas, fallbackCanvas)
const customConfig = loadCustomConfig()

const config: Config = {
  ...defaultConfig,
  ...domConfig,
  ...customConfig,
}

const form = document.querySelector('form')
const pointsElement = form!.elements.namedItem('points') as HTMLInputElement

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
      audio.get('scream')?.play()
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
    config.doors.forEach((door) => checkDoor(config, door))
  }
}

function checkDoor(config: Config, door: Door) {
  if (Math.abs(door.x - (config.state.pos.x + 40)) < 10) {
    if (!config.state.finished) {
      audio.get('yeaah')?.play()
      config.state.finished = true
    }
  }
}


function getRandomPositions() {
  let x = 0
  let y = 0

  const between = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  return new Array(30).fill(0).map(() => {
    x = !!x ? between(x + 20, x + 60) : 1600
    y = !!y ? between(y - 20, y - 60) : 600
    return ({ x, y })
  })
}

const init = async () => {
  
  const positions = getRandomPositions()
  const platforms = getPlatformsByPoints(positions)
  config.platforms.push(...platforms)

  if (!config.savedState) {
    config.savedState = JSON.parse(JSON.stringify(config.state))
  }

  resize(config)

  window.addEventListener('resize', () => resize(config))
  window.addEventListener('keydown', (e) => keyDown(config, e), false)
  window.addEventListener('keyup', (e) => keyUp(config, e), false)

  keyboardState.initialize()

  loadAssets()

  draw()
}

init()

let initialized = false

playerState.jumping$.subscribe((jumping: boolean) => {
  if (!jumping) {
    audio.get('jumpSpringDown')?.play()
    audio.get('jumpSpringUp')?.pause()
  }

  if (jumping) {
    audio.get('jumpSpringUp')?.play()
    audio.get('jumpSpringDown')?.pause()
  }
})

playerState.running$.subscribe((running: boolean) => {
  if (!initialized && running) {
    audio.get('thunder')?.play()
    initialized = true
  }

  if (!running) {
    audio.get('running')?.pause()
  }

  if (running) {
    audio.get('running')?.play()
  }
})



/**
 * Carrega posições da fase informada no hash da URL
 * @example localhost:1234/#1
 * @deprecated use `getRandomPositions()`
 */
 const getPositions = async () => {
  switch (location.hash) {
    default:
    case '#1': return import('./assets/levels/1.json')
    case '#2': return import('./assets/levels/2.json')
    case '#3': return import('./assets/levels/3.json')
  }
}