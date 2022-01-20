import { Point } from '../point'

export function getParamsPoints(points: Point[]) {
  const params = points.map(({ x, y }) => `${x},${y}`).join(';')
  const search = new URLSearchParams(location.search)
  search.set('points', params)
  return search.toString()
}
