import { CustomConfig, DefaultConfig, DOMConfig } from '../types/config';
import { OffScreen } from './utilities/offscreen';
import { Door } from './utilities/door';

export const defaultConfig: DefaultConfig = {
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
  colors: {
    bg: '#FBD0D0',
    wood1: '#B5754C',
    wood2: '#CB946D',
    wood3: '#4B3937',
    wood4: '#EB9A67',
    wood5: '#B46736',
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
};

export const customConfig: CustomConfig = {
  platforms: [],
  doors: [new Door(1600, 350), new Door(1205, -1160)],
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
  fallbackCanvas = createFallbackCanvas()
): DOMConfig {
  const ctx = canvas.getContext('2d');

  const rect = container.getBoundingClientRect();

  return {
    container,
    canvas,
    ctx,
    rect,
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
  };
}
