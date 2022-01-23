import { Config } from '@death-tower/core/interfaces';
import { brickFactory } from '../factories/brick';

export function drawBricks(config: Config) {
  const brickRowHeight = config.brick.height * 2 + config.brick.padding * 2;

  if (!config.storage.bricks) {
    config.storage.bricks = {};
    for (let i = 0; i < 16; i++) {
      config.storage.bricks['brick' + i] = brickFactory(
        config,
        brickRowHeight,
        i
      );
    }
  }

  if (config.ctx) {
    for (let row = -1; row < 12; row++) {
      config.ctx.drawImage(
        config.storage.bricks[
          'brick' + (config.state.pos.x % config.brick.width)
        ],
        config.tower.skyWidth,
        brickRowHeight * row + (config.state.pos.y % brickRowHeight)
      );
    }
  }
}
