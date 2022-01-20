import { easing } from './utilities/easing'
import { Config } from '../interfaces'

type FontSize = 12 | 24 | 36 | 48 | 72 | 96

type FontFamily = "'Germania One', cursive"

type Font = `${FontSize}px ${FontFamily}`

export function drawText(config: Config, font: Font, text: string) {
  if (config.state.dt && config.state.winner.opacity < 100) {
    config.state.winner.opacity += (config.state.dt * 0.2) | 0
  }
  if (config.state.winner.opacity > 100) {
    config.state.winner.opacity = 100
  }

  if (config.ctx && config.canvas) {
    config.ctx.fillStyle =
      'rgba(10, 10, 10, ' + config.state.winner.opacity / 100 + ')'
    config.ctx.rect(0, 0, config.canvas.width, config.canvas.height)
    config.ctx.fill()

    config.ctx.fillStyle =
      'rgba(6, 231, 65, ' + config.state.winner.opacity / 100 + ')'
    config.ctx.font = font
    config.ctx.fillText(
      text,
      600,
      440 - easing(config.state.winner.opacity / 100) * 40
    )
  }
}
