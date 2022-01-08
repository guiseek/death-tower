import { Config } from '../../interfaces/config'
import { Platform } from './platform'

export function drawPlatforms(
  $: Config,
  drawInfrontPlatforms: Platform[] | boolean
) {
  if (drawInfrontPlatforms) {
    $.state.activePlatforms = []
  }

  $.platforms.forEach((platform) => {
    if (platform.x < $.state.pos.x - 40) return

    if (platform.x > $.state.pos.x + 220) return

    if (drawInfrontPlatforms) {
      if (platform.isInFront($)) {
        platform.draw($)
        $.state.activePlatforms.push(platform)
      }
    } else if (!platform.isInFront($)) {
      platform.draw($)
    }
  })

  for (let i = 0; i < $.state.activePlatforms.length; i++) {
    $.state.activePlatforms[i].drawFront($)
  }
}
