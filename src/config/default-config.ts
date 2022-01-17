import { DefaultConfig } from '../interfaces/config'

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
    flip: false
  },
}

export function loadDefaultConfig(config: Partial<DefaultConfig> = {}) {
  return { ...defaultConfig, ...config }
}
