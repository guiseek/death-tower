import { drawPlatforms } from './map/platforms/draw-platforms'
import { DeathTowerState } from './state/death-tower-state'
import { keyboardState } from './state/keyboard-state'
import { drawShadows } from './map/tower/draw-shadows'
import { drawBricks } from './map/bricks/draw-bricks'
import { Platform } from './map/platforms/platform'
import { Arch, GameState } from './interfaces/arch'
import { playerState } from './state/player-state'
import { drawDoors } from './map/doors/draw-doors'
import { keyDown } from './map/utilities/key-down'
import { keyUp } from './map/utilities/key-up'
import { drawTitles } from './map/draw-titles'
import { drawPlayer } from './map/draw-player'
import { loadImage } from './map/load-image'
import { OffScreen } from './map/offscreen'
import { drawSky } from './map/draw-sky'
import { Door } from './map/doors/door'
import { resize } from './map/resize'

const fallbackCanvas = new OffScreen(10, 10).canvas
const form = document.querySelector('form')
const pointsElement = form!.elements.namedItem('points') as HTMLInputElement

const $: Arch = {
  container: null,
  canvas: null,
  ctx: null,
  rect: null,
  platforms: [
    new Platform(1600, 600),
    new Platform(1585, 600),
    new Platform(1570, 600),
    new Platform(1540, 500),
    new Platform(1525, 500),
    new Platform(1480, 500),
    new Platform(1465, 500),
    new Platform(1435, 400),
    new Platform(1415, 270),
    new Platform(1435, 135),
    new Platform(1465, 40),
    new Platform(1480, 40),
    new Platform(1500, -80),
    new Platform(1520, -200),
    new Platform(1520, -335),
    new Platform(1490, -460),
    new Platform(1460, -535),
    new Platform(1430, -610),
    new Platform(1415, -610),
    new Platform(1370, -610),
    new Platform(1355, -610),
    new Platform(1355, -610),
    new Platform(1330, -710),
    new Platform(1305, -810),
    new Platform(1280, -910),
    new Platform(1265, -910),
    new Platform(1220, -910),
    new Platform(1205, -910)
  ],
  openings: [new Door(1600, 350), new Door(1205, -1160)],
  brick: {
    shine: '',
    shade: 'rgba(256, 256, 256, 0.8)',
    color: 'rgba(143, 153, 163, 1)',
    width: 16,
    height: 48,
    padding: 4,
  },
  platform: {
    height: 22,
    width: 13 /* Degrees */,
    color: '#5A4142',
  },
  tower: {
    width: 1200,
    shadowWidth: 130,
    skyWidth: 200,
  },
  sky: {
    bg: '#092A50',
    starSizes: [2, 3, 4, 5],
    starColors: ['#1E728C', '#98ECFF', '#7AEFFF', '#FFF385'],
  },
  colors: {
    bg: '#FBD0D0',
    wood1: '#B5754C',
    wood2: '#CB946D',
    wood3: '#4B3937',
    wood4: '#EB9A67',
    wood5: '#B46736', // side support
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
    points: 0,
    lastPlatform: null,
    titles: {
      opacity: 0,
      ready: false,
      text: 'Tente outra vez : )',
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
      y: 0,
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

const state = new DeathTowerState($.state)

$.container = document.querySelector('#container') as HTMLElement
$.canvas = document.querySelector('canvas')
$.ctx = $.canvas!.getContext('2d')

function loadAssets() {
  const standing = new URL('assets/player/state=standing.svg', import.meta.url)
  const jumping = new URL('assets/player/state=jumping.svg', import.meta.url)
  const jumpingdown = new URL(
    'assets/player/state=jumpingdown.svg',
    import.meta.url
  )
  const running = new URL('assets/player/state=running.svg', import.meta.url)
  const walking = new URL('assets/player/state=walking.svg', import.meta.url)

  loadImage($, standing.pathname, 'standing', 0, false)
  loadImage($, standing.pathname, 'standing', 1, true)
  loadImage($, jumping.pathname, 'jumpingUp', 0, false)
  loadImage($, jumping.pathname, 'jumpingUp', 1, true)
  loadImage($, jumpingdown.pathname, 'jumpingDown', 0, false)
  loadImage($, jumpingdown.pathname, 'jumpingDown', 1, true)
  loadImage($, running.pathname, 'runningLeft', 0, false)
  loadImage($, running.pathname, 'runningLeft', 1, false)
  loadImage($, walking.pathname, 'runningLeft', 2, false)
  loadImage($, walking.pathname, 'runningLeft', 3, false)
  loadImage($, running.pathname, 'runningRight', 0, true)
  loadImage($, running.pathname, 'runningRight', 1, true)
  loadImage($, walking.pathname, 'runningRight', 2, true)
  loadImage($, walking.pathname, 'runningRight', 3, true)
}

let dead = false

function draw() {
  let now = document.timeline.currentTime ?? 0
  $.state.dt = now - ($.state.time || now)
  $.state.time = now

  if (!$.state.paused) {
    doCalculations()
  }

  if (!$.state.paused && $.state.titles.opacity !== 100) {
    drawSky($)
    drawPlatforms($, false)
    drawBricks($)
    drawDoors($)
    drawShadows($)
    drawPlatforms($, true)
    drawPlayer($)
  }

  if ($.state.paused) {
    drawTitles($)

    if (!dead) {
      audio.scream.play()
      dead = true
    }
  }

  requestAnimationFrame(draw)
}

function doCalculations() {
  if ($.input.left) {
    $.state.player.speed += $.settings.acceleration
  } else if ($.input.right) {
    $.state.player.speed -= $.settings.acceleration
  } else if ($.state.player.speed !== 0) {
    $.state.player.speed *= $.state.jump.isJumping
      ? $.settings.jump.friction
      : $.settings.friction
  }

  if (Math.abs($.state.player.speed) > $.settings.maxSpeed) {
    $.state.player.speed =
      $.state.player.speed > 0 ? $.settings.maxSpeed : -1 * $.settings.maxSpeed
  } else if (Math.abs($.state.player.speed) < $.settings.minSpeed) {
    playerState.idle()
    state.player({ speed: 0 })

    $.state.player.speed = 0
  }

  if ($.state.player.speed !== 0) {
    if (!$.state.jump.isJumping) {
      playerState.run()
    }

    const currentSpeed = $.state.jump.isJumping
      ? $.state.player.speed * 0.7
      : $.state.player.speed

    $.state.pos.x +=
      $.state.player.speed < 0
        ? Math.ceil(currentSpeed * ($.state.dt as number))
        : Math.floor(currentSpeed * ($.state.dt as number))

    $.state.player.dir = currentSpeed > 0 ? 0 : 1
    state.player($.state.player)
  }

  if (!$.state.climbstarted && $.input.jump) {
    $.state.climbstarted = true
  }

  if ($.input.jump || $.state.jump.isJumping) {
    if ($.state.jump.isGrounded) {
      playerState.jumpUp()
      playerState.idle()

      $.state.jump.isGrounded = false
      $.state.jump.isJumping = true
      $.state.jump.isBoosting = true
      $.state.jump.speed = $.settings.jump.maxSpeed
    }

    if ($.state.jump.isJumping) {
      const upwards = $.state.jump.speed > 0
      const adjust =
        ($.state.dt as number) < 30 ? 30 - ($.state.dt as number) : 0 // .·´¯`(>▂<)´¯`·.

      if (!upwards && $.state.jump.isBoosting) {
        $.state.jump.isBoosting = false
      }

      $.state.player.prevY = $.state.player.y
      $.state.player.y -= $.state.jump.speed * ($.state.dt as number)
      $.state.jump.speed -=
        ($.settings.jump.gravity[
          upwards ? ($.state.jump.isBoosting ? 'boost' : 'normal') : 'down'
        ] -
          adjust * 0.00002) *
        ($.state.dt as number)
    }
  }

  if ($.state.jump.isBoosting && !$.input.jump) {
    $.state.jump.isBoosting = false
  }

  if ($.state.climbstarted && $.state.pos.y < 1440) {
    $.state.pos.y +=
      ($.state.player.y + $.state.pos.y < 250
        ? $.state.climbspeed.fast
        : $.state.climbspeed.normal) * ($.state.dt as number)
  }

  collisionDetection()

  if ($.state.player.y + $.state.pos.y > 900) {
    playerState.idle()

    $.state.paused = true
  }

  state.setState($.state)
}


function collisionDetection() {
  if ($.state.jump.isJumping && $.state.jump.speed < 0) {
    for (let i = 0; i < $.state.activePlatforms.length; i++) {
      const platform = $.state.activePlatforms[i]

      if (Math.abs(platform.x - ($.state.pos.x + 90)) < 10) {

        const playerFloor = $.state.player.y + 250
        const playerFloorPrev = $.state.player.prevY + 250


        if (playerFloor > platform.y && playerFloorPrev < platform.y) {
          playerState.jumpDown()
          playerState.idle()

          $.state.player.y = platform.y - 250
          $.state.jump.isGrounded = true
          $.state.jump.isJumping = false
          $.state.jump.isBoosting = false
          $.state.jump.speed = 0
        }
      }
    }
  } else if ($.state.jump.isGrounded) {
    let groundToStandOnFound = false

    for (let i = 0; i < $.state.activePlatforms.length; i++) {
      let platform = $.state.activePlatforms[i]
      
      if (Math.abs(platform.x - ($.state.pos.x + 90)) < 10) {
        
        /**
         * Parou em uma plataforma posterior a última
         * em que seus pontos foram calculados
         */
        checkPoint($.state, platform)

        if (platform.y - ($.state.player.y + 250) === 0) {
          groundToStandOnFound = true

          break
        }
      }
    }

    if (!groundToStandOnFound) {
      playerState.jumpUp()


      $.state.jump.isGrounded = false
      $.state.jump.isJumping = true
      $.state.jump.isBoosting = true
      $.state.jump.speed = $.settings.jump.fallStartSpeed
    }
  }
}

function checkPoint(state: GameState, platform: Platform) {
  if (state.lastPlatform && platform.n > state.lastPlatform.n) {
    if (platform.n === state.lastPlatform.n + 1) {
      state.points += platform.n * 10

    } else {
      state.points += (platform.n * 10) * (state.player.speed * 10)
    }

    pointsElement.value = (state.points | 0).toString()

    state.lastPlatform = platform
  }
}

resize($)

window.addEventListener('resize', () => resize($))

if (!$.savedState) {
  $.savedState = JSON.parse(JSON.stringify($.state))
}

loadAssets()
draw()

if (!$.state.lastPlatform) {
  $.state.lastPlatform = $.platforms[0]
}

window.addEventListener('keydown', (e) => keyDown($, e), false)
window.addEventListener('keyup', (e) => keyUp($, e), false)

const audio = {
  thunder: new Audio(
    new URL('assets/sound/thunder-rumble.mp3', import.meta.url).pathname
  ),
  running: new Audio(
    new URL('assets/sound/running.mp3', import.meta.url).pathname
  ),
  jumpUp: new Audio(
    new URL('assets/sound/jump-up.mp3', import.meta.url).pathname
  ),
  jumpDown: new Audio(
    new URL('assets/sound/jump-down.mp3', import.meta.url).pathname
  ),
  scream: new Audio(
    new URL('assets/sound/dead-scream.mp3', import.meta.url).pathname
  ),
}

audio.thunder.loop = true
audio.running.loop = true

keyboardState.initialize()

let initialized = false

state.jump$.subscribe((jump) => {
  console.log(jump);
})

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
