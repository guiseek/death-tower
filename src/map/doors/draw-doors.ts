import { Config } from '../../interfaces/config'

export function drawDoors(config: Config) {
  config.openings.forEach((opening) => {
    if (opening.x < config.state.pos.x - 40) return

    if (opening.x > config.state.pos.x + 220) return

    opening.draw(config)
  })
}
