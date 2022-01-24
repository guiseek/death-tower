import { OffScreen, Door } from '@death-tower/core/util-map';
import {
  DOMConfig,
  CustomConfig,
  DefaultConfig,
  AnimationFramesConfig,
} from '@death-tower/core/interfaces';

export const defaultConfig: DefaultConfig = {
  brick: {
    shine: '',
    shade: 'rgba(200, 200, 200, 0.8)',
    color: '#64696C',
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
    shadowWidth: 100,
    skyWidth: 200,
  },
  sky: {
    bg: 'rgb(10, 21, 32)',
    starSizes: [3, 1, 2, 2],
    starColors: ['#f1f1f1', '#FFDCD4', '#7AEFFF', '#FFF385'],
  },
  colors: {
    bg: '#6A503E',
    wood1: '#6A503E',
    wood2: '#80604A',
    wood3: '#4B3937',
    wood4: '#6A503E',
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
    fullscreen: false,
  },
};

export const customConfig: CustomConfig = {
  platforms: [],
  doors: [new Door(1600, 350), new Door(1205, -1160)],
  savedState: null,
  state: {
    paused: false,
    touched: false,
    finished: false,
    score: 0,
    lastPlatform: null,
    platformReached: null,
    titles: {
      opacity: 0,
      ready: false,
      text: 'Não foi desta vez',
    },
    winner: {
      opacity: 0,
      ready: false,
      text: 'Você conseguiu!!!',
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
    lastPos: {
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
};

export function loadCustomConfig(
  config: Partial<CustomConfig> = {}
): CustomConfig {
  return { ...customConfig, ...config };
}

export function loadDefaultConfig(config: Partial<DefaultConfig> = {}) {
  return { ...defaultConfig, ...config };
}

function createContainer(): HTMLElement {
  return document.createElement('div');
}

function createCanvas() {
  return document.createElement('canvas');
}

function createFallbackCanvas() {
  const fallback = new OffScreen(10, 10);
  return fallback.canvas;
}


export function loadDomConfig(
  container = createContainer(),
  canvas = createCanvas(),
  fallbackCanvas = createFallbackCanvas(),
  animationFrames?: AnimationFramesConfig
): DOMConfig {
  const ctx = canvas.getContext('2d');

  const rect = container.getBoundingClientRect();

  return {
    container,
    canvas,
    ctx,
    rect,
    animationFrames: animationFrames ?? {
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
  };
}
