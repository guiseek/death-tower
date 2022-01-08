import { brickFactory } from './brick-factory'
import { Config } from '../../interfaces/config'

export function drawBricks($: Config) {
  const brickRowHeight = $.brick.height * 2 + $.brick.padding * 2

  if (!$.storage.bricks) {
    $.storage.bricks = {}
    for (let i = 0; i < 16; i++) {
      $.storage.bricks['brick' + i] = brickFactory($, brickRowHeight, i)
    }
  }

  for (let row = -1; row < 12; row++) {
    $.ctx!.drawImage(
      $.storage.bricks['brick' + ($.state.pos.x % $.brick.width)],
      $.tower.skyWidth,
      brickRowHeight * row + ($.state.pos.y % brickRowHeight)
    )
  }
}
