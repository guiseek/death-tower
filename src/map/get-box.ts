import { getCirclePoint } from './utilities/get-circle-point'
import { Arch } from '../interfaces/arch'

export function getBox($: Arch, radius: number, center: number) {
  let l = getCirclePoint(radius, 800, center - $.platform.width / 2),
    r = getCirclePoint(radius, 800, center + $.platform.width / 2)

  return {
    left: l,
    right: r,
    width: r - l,
    unit: (r - l) / 8,
  }
}
