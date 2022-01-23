import { Config } from '@death-tower/core/interfaces';
import { getCirclePoint } from './points/get-circle-point';

export function getBox(config: Config, radius: number, center: number) {
  const left = getCirclePoint(radius, 800, center - config.platform.width / 2);
  const right = getCirclePoint(radius, 800, center + config.platform.width / 2);

  return { left, right, width: right - left, unit: (right - left) / 8 };
}
