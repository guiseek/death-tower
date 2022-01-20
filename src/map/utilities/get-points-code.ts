import { Point } from '../point'

export function getPointsCode(points: Point[]) {
  const point = points.reduce((prev, curr) => {
    return { y: (prev.y += curr.y), x: (prev.x += curr.x) }
  })

  return point.x - point.y
}
