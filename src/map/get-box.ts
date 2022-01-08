import { getCirclePoint } from './utilities/get-circle-point'
import { Config } from '../interfaces/config'

export function getBox(config: Config, radius: number, center: number) {
  let l = getCirclePoint(radius, 800, center - config.platform.width / 2),
    r = getCirclePoint(radius, 800, center + config.platform.width / 2)

  return {
    left: l,
    right: r,
    width: r - l,
    unit: (r - l) / 8,
  }
}
