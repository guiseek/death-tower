import {
  Config,
  OuterBox,
  Platform as IPlatform,
} from '@death-tower/core/interfaces';
import { Coord } from './coords/coord';
import { drawPolygon } from './draw/polygon';
import { getBox } from './get-box';

export class Platform implements IPlatform {
  infront: boolean;
  outerBox: OuterBox<number, number> | null;

  constructor(public x: number, public y: number, public n: number) {
    this.x = x;
    this.y = y;
    this.infront = false;
    this.outerBox = null;
  }

  getY(config: Config) {
    return this.y + config.state.pos.y;
  }

  isInFront(config: Config) {
    const center = this.x - config.state.pos.x;
    // const innerBox = getBox(config, 600, center)
    const outerBox = getBox(config, 680, center);

    this.infront = outerBox.left > outerBox.right;
    return this.infront;
  }

  drawFront(config: Config) {
    if (config.ctx && this.outerBox?.left) {
      config.ctx.fillStyle = config.colors.wood2;
      config.ctx.fillRect(
        this.outerBox.left,
        this.getY(config),
        this.outerBox.width,
        config.platform.height
      );
    }
  }

  draw(config: Config) {
    const center = this.x - config.state.pos.x;
    const innerBox = getBox(config, 600, center);
    const outerBox = getBox(config, 680, center);
    const isLeftSide = innerBox.left > outerBox.left;

    this.infront = outerBox.left > outerBox.right;

    for (const dir of ['left', 'right']) {
      const adjust = dir === 'left' ? outerBox.unit : outerBox.unit * 6;
      const outer = {
          top: {
            left: new Coord(
              outerBox.left + adjust,
              this.getY(config) + config.platform.height
            ),
            right: new Coord(
              outerBox.left + outerBox.unit + adjust,
              this.getY(config) + config.platform.height
            ),
          },
          bottom: {
            left: new Coord(innerBox.left + adjust, this.getY(config) + 70),
            right: new Coord(
              innerBox.left + innerBox.unit + adjust,
              this.getY(config) + 70
            ),
          },
        },
        inner = {
          top: {
            left: new Coord(
              outerBox.left + adjust,
              this.getY(config) + (config.platform.height - 10)
            ),
            right: new Coord(
              outerBox.left + outerBox.unit + adjust,
              this.getY(config) + (config.platform.height - 10)
            ),
          },
          bottom: {
            left: new Coord(innerBox.left + adjust, this.getY(config) + 60),
            right: new Coord(
              innerBox.left + innerBox.unit + adjust,
              this.getY(config) + 60
            ),
          },
        };

      drawPolygon(
        config,
        config.colors.wood3,
        inner.top.left,
        inner.bottom.left,
        inner.bottom.right,
        inner.top.right
      );
      drawPolygon(
        config,
        config.colors.wood4,
        outer.top.left,
        outer.bottom.left,
        outer.bottom.right,
        outer.top.right
      );

      if (!isLeftSide) {
        drawPolygon(
          config,
          config.colors.wood5,
          inner.top.right,
          outer.top.right,
          outer.bottom.right,
          inner.bottom.right
        );
      } else {
        drawPolygon(
          config,
          config.colors.wood5,
          inner.top.left,
          outer.top.left,
          outer.bottom.left,
          inner.bottom.left
        );
      }
    }

    if (config.ctx) {
      config.ctx.fillStyle = config.colors.wood1;
      if (isLeftSide) {
        config.ctx.fillRect(
          innerBox.left,
          this.getY(config),
          outerBox.left - innerBox.left,
          config.platform.height
        );
      } else {
        config.ctx.fillRect(
          outerBox.right,
          this.getY(config),
          innerBox.left - outerBox.left,
          config.platform.height
        );
      }
    }

    this.outerBox = outerBox;
  }
}
