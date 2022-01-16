import { easing } from './utilities/easing'
import { Config } from '../interfaces/config'

export function drawWinner(config: Config) {
  if (config.state.dt && config.state.winner.opacity < 100) {
    config.state.winner.opacity += Math.floor(config.state.dt * 0.2)
  }

  if (config.state.winner.opacity > 100) config.state.winner.opacity = 100

  config.ctx!.fillStyle = 'rgba(10, 10, 10, ' + config.state.winner.opacity / 100 + ')'
  config.ctx!.rect(0, 0, config.canvas!.width, config.canvas!.height)
  config.ctx!.fill()

  config.ctx!.fillStyle = 'rgba(6, 231, 65, ' + config.state.winner.opacity / 100 + ')'
  config.ctx!.font = "64px 'Germania One', cursive"
  config.ctx!.fillText(
    config.state.winner.text,
    600,
    520 - easing(config.state.winner.opacity / 100) * 40
  )

  if (config.state.winner.opacity == 100 && config.input.jump) {
    config.state.winner.ready = true
  }

  if (config.state.winner.ready && config.input.jump) {
    config.state = JSON.parse(JSON.stringify(config.savedState))
    config.state.lastPlatform = null
  }
}
