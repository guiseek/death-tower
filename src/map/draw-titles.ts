import { easing } from './utilities/easing'
import { Config } from '../interfaces/config'

export function drawTitles($: Config) {
  if ($.state.dt && $.state.titles.opacity < 100) {
    $.state.titles.opacity += Math.floor($.state.dt * 0.2)
  }

  if ($.state.titles.opacity > 100) $.state.titles.opacity = 100

  $.ctx!.fillStyle = 'rgba(10, 10, 10, ' + $.state.titles.opacity / 100 + ')'
  $.ctx!.rect(0, 0, $.canvas!.width, $.canvas!.height)
  $.ctx!.fill()

  $.ctx!.fillStyle = 'rgba(201, 9, 21, ' + $.state.titles.opacity / 100 + ')'
  $.ctx!.font = "64px 'UnifrakturCook', cursive"
  $.ctx!.fillText(
    $.state.titles.text,
    600,
    520 - easing($.state.titles.opacity / 100) * 40
  )

  if ($.state.titles.opacity == 100 && !$.input.jump) {
    $.state.titles.ready = true
  }

  if ($.state.titles.ready && $.input.jump) {
    $.state = JSON.parse(JSON.stringify($.savedState))
    $.state.lastPlatform = null
  }
}
