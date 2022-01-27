import { OffScreen } from '@death-tower/core/util-map';
import { Config } from '@death-tower/core/interfaces';
import { PlayerAction } from './types/player-action';

export function loadImage(
  config: Config,
  src: string,
  type: PlayerAction,
  index: number,
  flipped: boolean
) {
  const temp = new OffScreen(317, 300);
  const image = new Image();

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
