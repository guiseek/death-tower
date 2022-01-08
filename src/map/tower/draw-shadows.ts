import { drawTowerShadow } from './draw-tower-shadow'
import { OffScreen } from '../../map/offscreen'
import { Config } from '../../interfaces/config'

export function drawShadows($: Config) {
  if ($.storage.shadows) {
    $.ctx!.drawImage($.storage.shadows, $.tower.skyWidth, 0)
  } else {
    const temp = new OffScreen($.tower.width, $.canvas!.height)
    drawTowerShadow(
      temp.ctx,
      0,
      $.tower.shadowWidth + 80,
      $.canvas!.height,
      '#666666',
      'transparent'
    )
    drawTowerShadow(
      temp.ctx,
      0,
      $.tower.shadowWidth,
      $.canvas!.height,
      'rgb(10, 10, 10)',
      'transparent'
    )
    drawTowerShadow(
      temp.ctx,
      temp.canvas.width - ($.tower.shadowWidth + 80),
      $.tower.shadowWidth + 80,
      $.canvas!.height,
      'transparent',
      '#666666'
    )
    drawTowerShadow(
      temp.ctx,
      temp.canvas.width - $.tower.shadowWidth,
      $.tower.shadowWidth,
      $.canvas!.height,
      'transparent',
      'rgb(10, 10, 10)'
    )
    $.storage.shadows = temp.canvas
  }
}
