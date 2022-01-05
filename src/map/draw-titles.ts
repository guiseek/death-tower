import { easing } from './utilities/easing'
import { Arch } from '../interfaces/arch'

export function drawTitles($: Arch) {
  if ($.state.dt && $.state.titles.opacity < 100) {
    $.state.titles.opacity += Math.floor($.state.dt * 0.2)
  }

  if ($.state.titles.opacity > 100) $.state.titles.opacity = 100

  $.ctx!.fillStyle = 'rgba(0, 0, 0, ' + $.state.titles.opacity / 100 + ')'
  $.ctx!.rect(0, 0, $.canvas!.width, $.canvas!.height)
  $.ctx!.fill()

  $.ctx!.fillStyle = 'rgba(245, 245, 245, ' + $.state.titles.opacity / 100 + ')'
  $.ctx!.font = "48px 'Germania One', cursive"
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
  }
}
