import { Config } from '../interfaces/config'

export function drawPlayer(config: Config) {
  const drawY = config.state.player.y + config.state.pos.y - 48
  const drawX = config.state.player.x - (config.state.player.dir ? 120 : 80)

  if (config.state.jump.isJumping) {
    if (config.state.jump.speed > 0) {
      config.ctx!.drawImage(
        config.animationFrames.jumpingUp[config.state.player.dir],
        drawX,
        drawY
      )
    } else {
      config.ctx!.drawImage(
        config.animationFrames.jumpingDown[config.state.player.dir],
        drawX,
        drawY
      )
    }
  } else if (config.state.player.speed !== 0) {
    if (config.state.player.dir) {
      config.ctx!.drawImage(
        config.animationFrames.runningRight[config.state.player.animationFrame],
        drawX,
        drawY
      )
    } else {
      config.ctx!.drawImage(
        config.animationFrames.runningLeft[config.state.player.animationFrame],
        drawX,
        drawY
      )
    }
  } else {
    config.ctx!.drawImage(
      config.animationFrames.standing[config.state.player.dir],
      drawX,
      drawY
    )
  }

  // config.ctx!.fillRect(config.state.player.x, config.state.player.y + config.state.pos.y, 150, 250);

  config.state.player.animationFrameCount += config.state.dt as number

  if (config.state.player.animationFrameCount > 50) {
    config.state.player.animationFrame += 1
    config.state.player.animationFrameCount = 0
  }

  if (config.state.player.animationFrame > 3) {
    config.state.player.animationFrame = 0
  }
}
