import { Arch } from '../../interfaces/arch'

export function drawDoors($: Arch) {
  $.openings.forEach((opening) => {
    if (opening.x < $.state.pos.x - 40) return

    if (opening.x > $.state.pos.x + 220) return

    opening.draw($)
  })
}
