import { getCirclePoint } from './points/get-circle-point';
import { Config } from '@death-tower/core/interfaces';
import { OffScreen } from './offscreen';
import { drawDoor } from './draw/door';

export class Door {
  constructor(public x: number, public y: number) {}

  draw(config: Config) {
    const center = this.x - config.state.pos.x;
    const l = getCirclePoint(600, 800, center - config.platform.width / 2);
    const r = getCirclePoint(600, 800, center + config.platform.width / 2);

    if (l > r) {
      const sl = getCirclePoint(560, 800, center - config.platform.width / 2);
      const sr = getCirclePoint(560, 800, center + config.platform.width / 2);
      const c = new OffScreen(1600, 250);
      const sc = new OffScreen(1600, 250);

      const smallDoor = drawDoor(sc, '#2A3849', sr, sl - sr, 250, '#262525');

      if (config.ctx) {
        const p = config.ctx.createPattern(
          smallDoor,
          'no-repeat'
        ) as CanvasPattern;
        const bigDoor = drawDoor(c, p, r, l - r, 250);
        config.ctx.drawImage(bigDoor, 0, this.y + config.state.pos.y);
      }
    }
  }
}
