import { getCirclePoint } from './get-circle-point';
import { Config } from '../../../types/config';

export function getBox(config: Config, radius: number, center: number) {
  const l = getCirclePoint(radius, 800, center - config.platform.width / 2);
  const r = getCirclePoint(radius, 800, center + config.platform.width / 2);

  return {
    left: l,
    right: r,
    width: r - l,
    unit: (r - l) / 8,
  };
}
