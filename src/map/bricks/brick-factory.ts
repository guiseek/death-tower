import { getCirclePoint } from '../utilities/get-circle-point';
import { Config } from '../../interfaces/config';
import { OffScreen } from './../offscreen';
import { Point } from '../../map/point';

export function brickFactory($: Config, height: number, pos: number) {
  const temp = new OffScreen($.tower.width, height)
  let x = $.brick.padding
  let y = $.brick.padding
  let pointA: Point | number = { x: 0, y: 0 }
  let pointB = $.brick.width
  const step = $.brick.width
  let halfrow = true
  const gradient = temp.ctx.createLinearGradient(0, 0, temp.canvas.width, height)

  gradient.addColorStop(0, 'black')
  gradient.addColorStop(0.35, '#353637')
  gradient.addColorStop(0.65, '#353637')
  gradient.addColorStop(1, 'black')

  temp.ctx.fillStyle = gradient

  temp.ctx.fillRect(0, 0, temp.canvas.width, temp.canvas.height)

  for (let i = 0; i < 2; i++) {
    for (let j = 180 + pos; j <= 360; j += step) {
      pointA = getCirclePoint(600, 600, j)

      if (halfrow) {
        j += step / 2
        halfrow = false
      }

      pointB = getCirclePoint(600, 600, j + step)

      // Main
      temp.ctx.fillStyle = $.brick.color
      temp.ctx.fillRect(
        pointA,
        y,
        pointB - pointA - $.brick.padding,
        $.brick.height
      )

      // Shade
      temp.ctx.fillStyle = $.brick.shade
      temp.ctx.fillRect(pointA, y, pointB - pointA - $.brick.padding, 3)
    }

    y += $.brick.padding
    y += $.brick.height
  }

  return temp.canvas
}
