import { Config } from '../interfaces/config'
import { Point } from './point'

export function drawPolygon($: Config, color: string, ...points: Point[]) {
  $.ctx!.fillStyle = color
  $.ctx!.beginPath()
  $.ctx!.moveTo(points[0].x, points[0].y)
  for (let i = 1; i < points.length; i++) {
    $.ctx!.lineTo(points[i].x, points[i].y)
  }
  $.ctx!.fill()
}
