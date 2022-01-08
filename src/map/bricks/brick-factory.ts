import { getCirclePoint } from '../utilities/get-circle-point';
import { Config } from '../../interfaces/config';
import { OffScreen } from './../offscreen';
import { Point } from '../../map/point';

export function brickFactory(config: Config, height: number, pos: number) {
  const temp = new OffScreen(config.tower.width, height)
  let x = config.brick.padding
  let y = config.brick.padding
  let pointA: Point | number = { x: 0, y: 0 }
  let pointB = config.brick.width
  const step = config.brick.width
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
      temp.ctx.fillStyle = config.brick.color
      temp.ctx.fillRect(
        pointA,
        y,
        pointB - pointA - config.brick.padding,
        config.brick.height
      )

      // Shade
      temp.ctx.fillStyle = config.brick.shade
      temp.ctx.fillRect(pointA, y, pointB - pointA - config.brick.padding, 3)
    }

    y += config.brick.padding
    y += config.brick.height
  }

  return temp.canvas
}
