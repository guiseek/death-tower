import { Arch } from '../interfaces/arch'
import { Point } from './point'

export function drawPolygon($: Arch, color: string, ...points: Point[]) {
  $.ctx!.fillStyle = color
  $.ctx!.beginPath()
  $.ctx!.moveTo(points[0].x, points[0].y)
  for (let i = 1; i < points.length; i++) {
    $.ctx!.lineTo(points[i].x, points[i].y)
  }
  $.ctx!.fill()
}
