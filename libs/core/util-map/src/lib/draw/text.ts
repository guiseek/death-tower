import { Config } from '@death-tower/core/interfaces';
import { easing } from '../effects/easing';

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface TransitionColor {
  start: RGB;
  end: RGB;
}

const TRANSITION_COLOR: TransitionColor = {
  start: { r: 10, g: 10, b: 10 },
  end: { r: 255, g: 236, b: 61 },
};

export function drawText(
  config: Config,
  text: string,
  color = TRANSITION_COLOR
) {
  if (config.canvas && config.ctx) {
    if (config.state.dt && config.state.titles.opacity < 100) {
      config.state.titles.opacity += Math.floor(config.state.dt * 0.2);
    }

    if (config.state.titles.opacity > 100) config.state.titles.opacity = 100;

    const rgbStart = `${color.start.r}, ${color.start.g}, ${color.start.b}`;
    config.ctx.fillStyle = `rgba(${rgbStart}, ${
      config.state.titles.opacity / 100
    })`;

    config.ctx.rect(0, 0, config.canvas.width, config.canvas.height);
    config.ctx.fill();

    const rgbEnd = `${color.end.r}, ${color.end.g}, ${color.end.b}`;
    config.ctx.fillStyle = `rgba(${rgbEnd}, ${
      config.state.titles.opacity / 100
    })`;
    config.ctx.font = "64px 'Germania One', cursive";

    const ease = easing(config.state.titles.opacity / 100);
    config.ctx.fillText(text, 600, 520 - ease * 40);

    if (config.state.titles.opacity == 100 && !config.input.jump) {
      config.state.titles.ready = true;
    }

    if (config.state.titles.ready && config.input.jump) {
      config.state = JSON.parse(JSON.stringify(config.savedState));
      config.state.lastPlatform = null;
    }
  }
}
