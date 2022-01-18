import { Config, Platform, Point } from '../../types/config';
import { brickFactory } from './brick-factory';
import { easing } from './easing';
import { OffScreen } from './offscreen';

/**
 * Desenha um polígono de n lados
 * @param config
 * @param color
 * @param points
 */
export function drawPolygon(config: Config, color: string, ...points: Point[]) {
  if (config.ctx) {
    config.ctx.fillStyle = color;
    config.ctx.beginPath();
    config.ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      config.ctx.lineTo(points[i].x, points[i].y);
    }

    config.ctx.fill();
  }
}

/**
 * Desenha porta
 * @param offscreen
 * @param color
 * @param x
 * @param width
 * @param height
 * @param bg
 * @returns
 */
export function drawDoor(
  offscreen: OffScreen,
  color: CanvasPattern | string,
  x: number,
  width: number,
  height: number,
  bg?: string
) {
  const y = 90;

  if (bg) {
    offscreen.ctx.fillStyle = bg;
    offscreen.ctx.fillRect(
      0,
      0,
      offscreen.canvas.width,
      offscreen.canvas.height
    );
  }

  offscreen.ctx.fillStyle = color;
  offscreen.ctx.beginPath();
  offscreen.ctx.moveTo(x, y);
  offscreen.ctx.lineTo(x, y + height);
  offscreen.ctx.lineTo(x + width, y + height);
  offscreen.ctx.lineTo(x + width, y);
  offscreen.ctx.ellipse(x + width / 2, y, width / 2, 90, 0, 0, Math.PI, true);
  offscreen.ctx.fill();

  return offscreen.canvas;
}

/**
 * Desenha portas no canvas
 * @param config
 */
export function drawDoors(config: Config) {
  config.doors.forEach((door) => {
    if (door.x < config.state.pos.x - 40) return;

    if (door.x > config.state.pos.x + 220) return;

    door.draw(config);
  });
}

/**
 * Desenha plataformas no canvas
 * @param config Config
 * @param drawInfrontPlatforms
 */
export function drawPlatforms(
  config: Config,
  drawInfrontPlatforms: Platform[] | boolean
) {
  if (drawInfrontPlatforms) {
    config.state.activePlatforms = [];
  }

  config.platforms.forEach((platform) => {
    if (platform.x < config.state.pos.x - 40) return;

    if (platform.x > config.state.pos.x + 220) return;

    if (drawInfrontPlatforms) {
      if (platform.isInFront(config)) {
        platform.draw(config);
        config.state.activePlatforms.push(platform);
      }
    } else if (!platform.isInFront(config)) {
      platform.draw(config);
    }
  });

  for (let i = 0; i < config.state.activePlatforms.length; i++) {
    config.state.activePlatforms[i].drawFront(config);
  }
}

/**
 * Desenha sombra no canvas
 * @param ctx
 * @param start
 * @param width
 * @param height
 * @param from
 * @param to
 */
export function drawTowerShadow(
  ctx: CanvasRenderingContext2D,
  start: number,
  width: number,
  height: number,
  from: string,
  to: string
) {
  const grd = ctx.createLinearGradient(start, 0, start + width, 0);
  grd.addColorStop(0, from);
  grd.addColorStop(1, to);

  ctx.fillStyle = grd;
  ctx.fillRect(start, 0, width, height);
}

/**
 * Desenha sombras no canvas
 * @param config
 */
export function drawShadows(config: Config) {
  if (config.ctx && config.storage.shadows) {
    config.ctx.drawImage(config.storage.shadows, config.tower.skyWidth, 0);
  } else if (config.canvas) {
    const temp = new OffScreen(config.tower.width, config.canvas.height);
    drawTowerShadow(
      temp.ctx,
      0,
      config.tower.shadowWidth + 80,
      config.canvas.height,
      '#666666',
      'transparent'
    );
    drawTowerShadow(
      temp.ctx,
      0,
      config.tower.shadowWidth,
      config.canvas.height,
      'rgb(10, 10, 10)',
      'transparent'
    );
    drawTowerShadow(
      temp.ctx,
      temp.canvas.width - (config.tower.shadowWidth + 80),
      config.tower.shadowWidth + 80,
      config.canvas.height,
      'transparent',
      '#666666'
    );
    drawTowerShadow(
      temp.ctx,
      temp.canvas.width - config.tower.shadowWidth,
      config.tower.shadowWidth,
      config.canvas.height,
      'transparent',
      'rgb(10, 10, 10)'
    );
    config.storage.shadows = temp.canvas;
  }
}

/**
 * Desenha jogador no canvas
 * @param config
 */
export function drawPlayer(config: Config) {
  const drawY = config.state.player.y + config.state.pos.y - 48;
  const drawX = config.state.player.x - (config.state.player.dir ? 120 : 80);

  if (config.ctx) {
    if (config.state.jump.isJumping) {
      if (config.state.jump.speed > 0) {
        config.ctx.drawImage(
          config.animationFrames.jumpingUp[config.state.player.dir],
          drawX,
          drawY
        );
      } else {
        config.ctx.drawImage(
          config.animationFrames.jumpingDown[config.state.player.dir],
          drawX,
          drawY
        );
      }
    } else if (config.state.player.speed !== 0) {
      if (config.state.player.dir) {
        config.ctx.drawImage(
          config.animationFrames.runningRight[
            config.state.player.animationFrame
          ],
          drawX,
          drawY
        );
      } else {
        config.ctx.drawImage(
          config.animationFrames.runningLeft[
            config.state.player.animationFrame
          ],
          drawX,
          drawY
        );
      }
    } else {
      config.ctx.drawImage(
        config.animationFrames.standing[config.state.player.dir],
        drawX,
        drawY
      );
    }

    // config.ctx.fillRect(config.state.player.x, config.state.player.y + config.state.pos.y, 150, 250);

    config.state.player.animationFrameCount += config.state.dt as number;

    if (config.state.player.animationFrameCount > 50) {
      config.state.player.animationFrame += 1;
      config.state.player.animationFrameCount = 0;
    }

    if (config.state.player.animationFrame > 3) {
      config.state.player.animationFrame = 0;
    }
  }
}

/**
 * Desenha céu no canvas
 * @param config
 */
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

/**
 * Desenha títulos
 * @param config
 */
export function drawTitles(config: Config) {
  if (config.state.dt && config.state.titles.opacity < 100) {
    config.state.titles.opacity += Math.floor(config.state.dt * 0.2);
  }

  if (config.state.titles.opacity > 100) config.state.titles.opacity = 100;

  if (config.ctx && config.canvas) {
    config.ctx.fillStyle =
      'rgba(10, 10, 10, ' + config.state.titles.opacity / 100 + ')';
    config.ctx.rect(0, 0, config.canvas.width, config.canvas.height);
    config.ctx.fill();

    config.ctx.fillStyle =
      'rgba(255, 236, 61, ' + config.state.titles.opacity / 100 + ')';
    config.ctx.font = "64px 'Germania One', cursive";
    config.ctx.fillText(
      config.state.titles.text,
      600,
      520 - easing(config.state.titles.opacity / 100) * 40
    );

    if (config.state.titles.opacity == 100 && !config.input.jump) {
      config.state.titles.ready = true;
    }

    if (config.state.titles.ready && config.input.jump) {
      config.state = JSON.parse(JSON.stringify(config.savedState));
      config.state.lastPlatform = null;
    }
  }
}

/**
 * Desenha tijolos da torre
 * @param config
 */
export function drawBricks(config: Config) {
  const brickRowHeight = config.brick.height * 2 + config.brick.padding * 2;

  if (!config.storage.bricks) {
    config.storage.bricks = {};
    for (let i = 0; i < 16; i++) {
      config.storage.bricks['brick' + i] = brickFactory(
        config,
        brickRowHeight,
        i
      );
    }
  }

  if (config.ctx) {
    for (let row = -1; row < 12; row++) {
      config.ctx.drawImage(
        config.storage.bricks[
          'brick' + (config.state.pos.x % config.brick.width)
        ],
        config.tower.skyWidth,
        brickRowHeight * row + (config.state.pos.y % brickRowHeight)
      );
    }
  }
}
