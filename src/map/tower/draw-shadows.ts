import { drawTowerShadow } from './draw-tower-shadow'
import { OffScreen } from '../../map/offscreen'
import { Config } from '../../interfaces/config'

export function drawShadows(config: Config) {
  if (config.storage.shadows) {
    config.ctx!.drawImage(config.storage.shadows, config.tower.skyWidth, 0)
  } else {
    const temp = new OffScreen(config.tower.width, config.canvas!.height)
    drawTowerShadow(
      temp.ctx,
      0,
      config.tower.shadowWidth + 80,
      config.canvas!.height,
      '#666666',
      'transparent'
    )
    drawTowerShadow(
      temp.ctx,
      0,
      config.tower.shadowWidth,
      config.canvas!.height,
      'rgb(10, 10, 10)',
      'transparent'
    )
    drawTowerShadow(
      temp.ctx,
      temp.canvas.width - (config.tower.shadowWidth + 80),
      config.tower.shadowWidth + 80,
      config.canvas!.height,
      'transparent',
      '#666666'
    )
    drawTowerShadow(
      temp.ctx,
      temp.canvas.width - config.tower.shadowWidth,
      config.tower.shadowWidth,
      config.canvas!.height,
      'transparent',
      'rgb(10, 10, 10)'
    )
    config.storage.shadows = temp.canvas
  }
}
