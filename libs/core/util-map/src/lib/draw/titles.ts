import { Config } from '@death-tower/core/interfaces';
import { easing } from '../effects/easing';

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
  }

  if (config.state.titles.opacity == 100 && !config.input.jump) {
    config.state.titles.ready = true;
  }

  if (config.state.titles.ready && config.input.jump) {
    config.state = JSON.parse(JSON.stringify(config.savedState));
    config.state.lastPlatform = null;
  }
}
