import { Config } from '../interfaces/config'
import { Point } from './point'

export function drawPolygon(config: Config, color: string, ...points: Point[]) {
  config.ctx!.fillStyle = color
  config.ctx!.beginPath()
  config.ctx!.moveTo(points[0].x, points[0].y)
  for (let i = 1; i < points.length; i++) {
    config.ctx!.lineTo(points[i].x, points[i].y)
  }
  config.ctx!.fill()
}
