import { DOMConfig } from '../interfaces'
import { OffScreen } from '../map'

function createContainer(): HTMLElement {
  return document.createElement('div')
}

function createCanvas() {
  return document.createElement('canvas')
}

function createFallbackCanvas() {
  const fallback = new OffScreen(10, 10)
  return fallback.canvas
}

export function loadDomConfig(
  container = createContainer(),
  canvas = createCanvas(),
  fallbackCanvas = createFallbackCanvas()
): DOMConfig {
  const ctx = canvas.getContext('2d')

  const rect = container.getBoundingClientRect()

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
  }
}
