import { Platform } from './platform'
import { Point } from '../point'

export function getPlatformsByPoints<T extends Point>(
  points: Record<keyof T, number>[]
) {
  return points.map(({ x, y }) => new Platform(x, y))
}
