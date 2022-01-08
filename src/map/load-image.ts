import { TypeCanvas } from '../interfaces/type-canvas'
import { Config } from '../interfaces/config'
import { OffScreen } from './offscreen'

export function loadImage(
  config: Config,
  src: string,
  type: TypeCanvas,
  index: number,
  flipped: boolean
) {
  let temp = new OffScreen(317, 300),
    image = new Image()

  image.onload = function () {
    if (flipped) {
      temp.ctx.save()
      temp.ctx.scale(-1, 1)
    }

    temp.ctx.drawImage(image, 0, 0, 317 * (flipped ? -1 : 1), 300)

    if (flipped) {
      temp.ctx.restore()
    }

    config.animationFrames[type][index] = temp.canvas
  }

  image.src = src

  return temp.canvas
}
