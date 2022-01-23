import { Config } from '@death-tower/core/interfaces';
import { OffScreen } from '../offscreen';

export function drawSky(config: Config) {
  if (config.canvas && config.ctx) {
    if (config.storage.sky == null) {
      const height = config.canvas.height;
      const temp = new OffScreen(config.canvas.width, height);

      temp.ctx.fillStyle = config.sky.bg;
      temp.ctx.fillRect(0, 0, config.canvas.width, height);

      for (let i = 0; i < 150; i++) {
        const starSize = Math.floor(
          Math.random() * config.sky.starSizes.length
        );

        temp.ctx.fillStyle = config.sky.starColors[starSize];
        temp.ctx.beginPath();
        temp.ctx.arc(
          Math.floor(Math.random() * config.canvas.width),
          Math.floor(Math.random() * height),
          config.sky.starSizes[starSize],
          0,
          2 * Math.PI
        );
        temp.ctx.fill();
      }

      config.storage.sky = temp.canvas;
    } else {
      const skypos = ((config.state.pos.x - 2000) % 200) * 8 * -1;
      const skyYPos = config.state.pos.y % config.canvas.height;

      config.ctx.drawImage(config.storage.sky, skypos, skyYPos);
      config.ctx.drawImage(
        config.storage.sky,
        skypos - config.canvas.width,
        skyYPos
      );
      config.ctx.drawImage(
        config.storage.sky,
        skypos,
        skyYPos - config.canvas.height
      );
      config.ctx.drawImage(
        config.storage.sky,
        skypos - config.canvas.width,
        skyYPos - config.canvas.height
      );
    }
  }
}
