import { AudioActionConfig, DOMConfig } from '../interfaces'
import { OffScreen } from '../map'

function createContainer(): HTMLElement {
  return document.createElement('div')
}

function createCanvas() {
  return document.createElement('canvas')
}

function createAudio() {
  return document.createElement('audio')
}

function createFallbackCanvas() {
  const fallback = new OffScreen(10, 10)
  return fallback.canvas
}

export function loadDomConfig(
  container = createContainer(),
  canvas = createCanvas(),
  fallbackCanvas = createFallbackCanvas(),
  audioAction: AudioActionConfig
): DOMConfig {
  const ctx = canvas.getContext('2d')

  const rect = container.getBoundingClientRect()

  return {
    container,
    canvas,
    ctx,
    rect,
    audioAction,
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
  }
}
