import { easing } from './utilities/easing'
import { Config } from '../interfaces/config'

export function drawTitles(config: Config) {
  if (config.state.dt && config.state.titles.opacity < 100) {
    config.state.titles.opacity += Math.floor(config.state.dt * 0.2)
  }

  if (config.state.titles.opacity > 100) config.state.titles.opacity = 100

  config.ctx!.fillStyle = 'rgba(10, 10, 10, ' + config.state.titles.opacity / 100 + ')'
  config.ctx!.rect(0, 0, config.canvas!.width, config.canvas!.height)
  config.ctx!.fill()

  config.ctx!.fillStyle = 'rgba(201, 9, 21, ' + config.state.titles.opacity / 100 + ')'
  config.ctx!.font = "64px 'UnifrakturMaguntia', cursive"
  config.ctx!.fillText(
    config.state.titles.text,
    600,
    520 - easing(config.state.titles.opacity / 100) * 40
  )

  if (config.state.titles.opacity == 100 && !config.input.jump) {
    config.state.titles.ready = true
  }

  if (config.state.titles.ready && config.input.jump) {
    config.state = JSON.parse(JSON.stringify(config.savedState))
    config.state.lastPlatform = null
  }
}
