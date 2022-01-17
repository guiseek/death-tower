import { loadDefaultConfig, loadCustomConfig, loadDomConfig } from './config'
import { keyboardState, playerState } from './state'
import { Config, ButtonType } from './interfaces'
import { TimerService } from './services/timer'
import { drawWinner } from './map/draw-winner'
import { getButton } from './utils/get-button'
import { audio } from './providers/audio'
import {
  getPlatformsByPoints,
  drawPlatforms,
  drawShadows,
  drawBricks,
  drawDoors,
  checkDoor,
  drawTitles,
  drawPlayer,
  loadImage,
  OffScreen,
  checkPoint,
  drawSky,
  resize,
  keyDown,
  keyUp,
  Door,
  Point,
  getLevel,
  getRandomPoints,
} from './map'


const buttons: Record<ButtonType, HTMLButtonElement> = {
  fullscreen: getButton('fullscreen'),
  jump: getButton('jump'),
  left: getButton('left'),
  right: getButton('right'),
}

const form = document.querySelector('form')
const pointsElement = form!.elements.namedItem('points') as HTMLInputElement
const timerElement = form!.elements.namedItem('seconds') as HTMLInputElement

timerElement.value = `${40}`

const container = document.querySelector('#container') as HTMLElement
const canvas = document.querySelector('canvas') as HTMLCanvasElement

const fallbackCanvas = new OffScreen(10, 10).canvas

const defaultConfig = loadDefaultConfig()
const domConfig = loadDomConfig(container, canvas, fallbackCanvas)

/**
 * Áudio
 */
const jumpSpringDown = audio.get('jumpSpringDown')
const jumpSpringUp = audio.get('jumpSpringUp')
const timeWaveRipple = audio.get('timeWaveRipple2')
const running = audio.get('running')
const thunder = audio.get('thunder')
const scream = audio.get('scream')
const clock = audio.get('clockTicking')

/**
 * Níveis de dificuldade
 */
const hashLevel = location.hash.substring(1)

if (!hashLevel) {
  location.hash = 'training'
}

const level = getLevel(hashLevel)
const positions = getRandomPoints(level, level.y.max - 2)
const platforms = getPlatformsByPoints(positions)
const setPositions = (positions: Point[]) =>
  ((window as any)['positions'] = positions)

setPositions(positions)

/**
 * Portas
 *
 * Adiciona a primeira porta ao array e abaixo adiciona
 * a última no local da última plataforma do random
 */
const doors = [new Door(1600, 350)]
const lastPos = positions.pop()
if (lastPos) {
  doors.push(new Door(lastPos!.x, lastPos!.y - 250))
}

/**
 * Configurações do jogo
 */
const customConfig = loadCustomConfig({ doors })

const config: Config = {
  ...defaultConfig,
  ...domConfig,
  ...customConfig,
}

/**
 * Com as plataformas e configuração adiciona a configuração
 */
config.platforms.push(...platforms)

/**
 * Recarrega configurações do jogo
 * ao trocar de level
 */
onpopstate = (e) => location.reload()

// Estado global
let dead = false

// Mata o player
function die(config: Config) {
  timeWaveRipple.play()
  timer.reset()
  scream.play()
  playerState.idle()
  playerState.pause()

  config.state.paused = true
  dead = true
}

/**
 * Contagem regressiva pra conclusão do jogo
 */
const timer = new TimerService(+timerElement.value)

/**
 * Atualiza o estado do jogo no canvas
 */
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

  if (
    !config.state.paused &&
    config.state.titles.opacity !== 100 &&
    config.state.winner.opacity !== 100
  ) {
    drawSky(config)
    drawPlatforms(config, false)
    drawBricks(config)
    drawDoors(config)
    drawShadows(config)
    drawPlatforms(config, true)
    drawPlayer(config)
  }

  if (!config.state.paused && config.state.finished) {
    navigator.vibrate(500)
    drawWinner(config)
    if (!clock.paused) {
      clock.pause()
    }
    timer.reset()
  }

  if (config.state.paused) {
    drawTitles(config)
    if (!clock.paused) {
      clock.pause()
    }
    if (!dead) die(config)
  }

  requestAnimationFrame(draw)
}

/**
 * Calcula as posições do player e plataformas
 */
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
    playerState.setSpeed(0)

    config.state.player.speed = 0
  }

  if (config.state.player.speed !== 0) {
    if (!config.state.jump.isJumping) {
      playerState.run()
    }

    const currentSpeed = config.state.jump.isJumping
      ? config.state.player.speed * 0.7
      : config.state.player.speed

    playerState.setSpeed(currentSpeed)

    config.state.pos.x +=
      config.state.player.speed < 0
        ? Math.ceil(currentSpeed * (config.state.dt as number))
        : Math.floor(currentSpeed * (config.state.dt as number))

    const dir = currentSpeed > 0 ? 0 : 1

    playerState.toTurn(dir)

    config.state.player.dir = dir
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
    playerState.pause()
    playerState.idle()

    config.state.paused = true
  }

  if (
    config.state.lastPlatform &&
    config.state.lastPlatform.n === platforms.length - 1
  ) {
    config.state.finished = true
  }
}

/**
 * Detecta colisões
 */
function collisionDetection() {
  if (config.state.jump.isJumping && config.state.jump.speed < 0) {
    for (let i = 0; i < config.state.activePlatforms.length; i++) {
      const platform = config.state.activePlatforms[i]

      if (Math.abs(platform.x - (config.state.pos.x + 90)) < 10) {
        const playerFloor = config.state.player.y + 250
        const playerFloorPrev = config.state.player.prevY + 250

        if (playerFloor > platform.y && playerFloorPrev < platform.y) {
          playerState.setPlatform(platform.n)
          playerState.jumpDown()
          playerState.idle()

          navigator.vibrate(50)

          checkPoint(config.state, platform)

          pointsElement.value = (config.state.points | 0).toString()

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

/**
 * Carrega imagens que alternam entre as cenas
 */
function loadImages(config: Config) {
  const standing = new URL(
    'assets/player/zumbi-2/state=standing.png',
    import.meta.url
  )
  const jumping = new URL(
    'assets/player/zumbi-2/state=jumping.png',
    import.meta.url
  )
  const jumpingdown = new URL(
    'assets/player/zumbi-2/state=jumpingdown.png',
    import.meta.url
  )
  const running = new URL(
    'assets/player/zumbi-2/state=running.png',
    import.meta.url
  )
  const walking = new URL(
    'assets/player/zumbi-2/state=walking.png',
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
  loadImage(config, running.pathname, 'runningRight', 0, true)
  loadImage(config, running.pathname, 'runningRight', 1, true)
  loadImage(config, walking.pathname, 'runningRight', 2, true)
  loadImage(config, walking.pathname, 'runningLeft', 2, false)
  loadImage(config, walking.pathname, 'runningLeft', 3, false)
  loadImage(config, walking.pathname, 'runningRight', 3, true)
}

let initialized = false

/**
 * Inicia o jogo
 */
const init = async () => {
  if (!config.savedState) {
    config.savedState = JSON.parse(JSON.stringify(config.state))
  }

  resize(config)

  window.addEventListener('resize', () => resize(config))
  window.addEventListener('keydown', (e) => keyDown(config, e), false)
  window.addEventListener('keyup', (e) => keyUp(config, e), false)

  buttons.jump.ontouchstart = () => (config.input.jump = true)
  buttons.jump.ontouchend = () => (config.input.jump = false)

  buttons.left.ontouchstart = () => (config.input.left = true)
  buttons.left.ontouchend = () => (config.input.left = false)

  buttons.right.ontouchstart = () => (config.input.right = true)
  buttons.right.ontouchend = () => (config.input.right = false)

  keyboardState.initialize()

  loadImages(config)

  draw()
}

let fullscreen = false

const handleFullScreen = () => {
  const svgEnter = buttons.fullscreen.querySelector('#fullscreen-enter')
  const svgExit = buttons.fullscreen.querySelector('#fullscreen-exit')

  buttons.fullscreen.onclick = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      svgExit?.classList.add('hidden')
      svgEnter?.classList.remove('hidden')
    } else {
      document.exitFullscreen()
      svgExit?.classList.remove('hidden')
      svgEnter?.classList.add('hidden')
    }

    buttons.fullscreen.blur()

    fullscreen = !fullscreen
  }

  document.onfullscreenchange = (e) => {
    fullscreen = !fullscreen
  }
}

init().then(async () => {
  handleFullScreen()

  playerState.jumping$.subscribe(async (jumping: boolean) => {
    if (!jumping) {
      if (!jumpSpringUp.paused) {
        jumpSpringUp.pause()
      }

      if (jumpSpringDown.paused) {
        await jumpSpringDown.play()
      }
    }

    if (jumping) {
      if (!jumpSpringDown.paused) {
        jumpSpringDown.pause()
      }
      if (jumpSpringUp.paused) {
        await jumpSpringUp.play()
      }
    }
  })

  playerState.running$.subscribe((isRunning: boolean) => {
    if (!initialized && isRunning) {
      thunder.play()
      timer.start()

      timer.countdown$.subscribe((value) => {
        timerElement.value = `${value}`

        if (!config.state.paused && value === 0) {
          die(config)
        }

        if (clock.paused && value < 20) {
          clock.play()
        }
      })

      initialized = true
    }

    if (!isRunning) {
      running.pause()
    }

    if (isRunning) {
      running.play()
    }
  })
})
