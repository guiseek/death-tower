import { Point } from '../point'

export function getParamsPoints(points: Point[]) {
  const params = points.map(({ x, y }) => {
    // Convertendo decimais para hexadecimais
    return `${x.toString(16)},${y.toString(16)}`
  }).join(';')
  const search = new URLSearchParams(location.search)
  search.set('points', params)
  return search.toString()
}
