import { Arch } from '../interfaces/arch'

export function drawPlayer($: Arch) {
  const drawY = $.state.player.y + $.state.pos.y - 48
  const drawX = $.state.player.x - ($.state.player.dir ? 120 : 80)

  if ($.state.jump.isJumping) {
    if ($.state.jump.speed > 0) {
      $.ctx!.drawImage(
        $.animationFrames.jumpingUp[$.state.player.dir],
        drawX,
        drawY
      )
    } else {
      $.ctx!.drawImage(
        $.animationFrames.jumpingDown[$.state.player.dir],
        drawX,
        drawY
      )
    }
  } else if ($.state.player.speed !== 0) {
    if ($.state.player.dir) {
      $.ctx!.drawImage(
        $.animationFrames.runningRight[$.state.player.animationFrame],
        drawX,
        drawY
      )
    } else {
      $.ctx!.drawImage(
        $.animationFrames.runningLeft[$.state.player.animationFrame],
        drawX,
        drawY
      )
    }
  } else {
    $.ctx!.drawImage(
      $.animationFrames.standing[$.state.player.dir],
      drawX,
      drawY
    )
  }

  // $.ctx!.fillRect($.state.player.x, $.state.player.y + $.state.pos.y, 150, 250);

  $.state.player.animationFrameCount += $.state.dt as number

  if ($.state.player.animationFrameCount > 50) {
    $.state.player.animationFrame += 1
    $.state.player.animationFrameCount = 0
  }

  if ($.state.player.animationFrame > 3) {
    $.state.player.animationFrame = 0
  }
}
