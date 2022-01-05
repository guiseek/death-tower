import { drawTowerShadow } from './draw-tower-shadow'
import { OffScreen } from '../../map/offscreen'
import { Arch } from '../../interfaces/arch'

export function drawShadows($: Arch) {
  if ($.storage.shadows) {
    $.ctx!.drawImage($.storage.shadows, $.tower.skyWidth, 0)
  } else {
    const temp = new OffScreen($.tower.width, $.canvas!.height)
    drawTowerShadow(
      temp.ctx,
      0,
      $.tower.shadowWidth + 80,
      $.canvas!.height,
      '#727C80',
      'transparent'
    )
    drawTowerShadow(
      temp.ctx,
      0,
      $.tower.shadowWidth,
      $.canvas!.height,
      '#00011F',
      'transparent'
    )
    drawTowerShadow(
      temp.ctx,
      temp.canvas.width - ($.tower.shadowWidth + 80),
      $.tower.shadowWidth + 80,
      $.canvas!.height,
      'transparent',
      '#727C80'
    )
    drawTowerShadow(
      temp.ctx,
      temp.canvas.width - $.tower.shadowWidth,
      $.tower.shadowWidth,
      $.canvas!.height,
      'transparent',
      '#00011F'
    )
    $.storage.shadows = temp.canvas
  }
}
