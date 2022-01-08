import { Config } from '../../interfaces/config'

export function drawDoors($: Config) {
  $.openings.forEach((opening) => {
    if (opening.x < $.state.pos.x - 40) return

    if (opening.x > $.state.pos.x + 220) return

    opening.draw($)
  })
}
