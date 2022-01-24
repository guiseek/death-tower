import { Config } from '@death-tower/core/interfaces';
import { easing } from '../effects/easing';

export function drawWinner(config: Config, code?: number) {
  if (config.state.dt && config.state.winner.opacity < 100) {
    config.state.winner.opacity += Math.floor(config.state.dt * 0.2);
  }

  if (config.state.winner.opacity > 100) config.state.winner.opacity = 100;

  if (config.ctx && config.canvas) {
    config.ctx.fillStyle =
      'rgba(10, 10, 10, ' + config.state.winner.opacity / 100 + ')';
    config.ctx.rect(0, 0, config.canvas.width, config.canvas.height);
    config.ctx.fill();

    config.ctx.fillStyle =
      'rgba(6, 231, 65, ' + config.state.winner.opacity / 100 + ')';
    config.ctx.font = "64px 'Germania One', cursive";
    config.ctx.fillText(
      config.state.winner.text,
      600,
      440 - easing(config.state.winner.opacity / 100) * 40
    );

    if (code) {
      config.ctx.fillStyle =
        'rgba(255, 255, 255, ' + config.state.winner.opacity / 100 + ')';
      config.ctx.font = "48px 'Germania One', cursive";
      config.ctx.fillText(
        `Desafio: #${code}`,
        650,
        520 - easing(config.state.winner.opacity / 100) * 40
      );
    }
  }

  if (config.state.winner.opacity == 100 && config.input.jump) {
    config.state.winner.ready = true;
  }

  // if (config.state.winner.ready && config.input.jump) {
  //   config.state = JSON.parse(JSON.stringify(config.savedState));
  //   config.state.lastPlatform = null;
  //   config.state.touched = false;
  // }
}
