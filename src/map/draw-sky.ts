import { Config } from '../interfaces/config'
import { OffScreen } from './offscreen'

export function drawSky($: Config) {
  if ($.storage.sky == null) {
    const height = $.canvas!.height
    const temp = new OffScreen($.canvas!.width, height)

    temp.ctx.fillStyle = $.sky.bg
    temp.ctx.fillRect(0, 0, $.canvas!.width, height)

    for (let i = 0; i < 150; i++) {
      const starSize = Math.floor(Math.random() * $.sky.starSizes.length)

      temp.ctx.fillStyle = $.sky.starColors[starSize]
      temp.ctx.beginPath()
      temp.ctx.arc(
        Math.floor(Math.random() * $.canvas!.width),
        Math.floor(Math.random() * height),
        $.sky.starSizes[starSize],
        0,
        2 * Math.PI
      )
      temp.ctx.fill()
    }

    $.storage.sky = temp.canvas
  } else {
    const skypos = (($.state.pos.x - 2000) % 200) * 8 * -1
    const skyYPos = $.state.pos.y % $.canvas!.height

    $.ctx!.drawImage($.storage.sky, skypos, skyYPos)
    $.ctx!.drawImage($.storage.sky, skypos - $.canvas!.width, skyYPos)
    $.ctx!.drawImage($.storage.sky, skypos, skyYPos - $.canvas!.height)
    $.ctx!.drawImage(
      $.storage.sky,
      skypos - $.canvas!.width,
      skyYPos - $.canvas!.height
    )
  }
}
