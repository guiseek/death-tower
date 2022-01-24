import { Config } from '@death-tower/core/interfaces';
import { easing } from '../effects/easing';

export function drawLoser(config: Config) {
  if (config.state.dt && config.state.titles.opacity < 100) {
    config.state.titles.opacity += Math.floor(config.state.dt * 0.2);
  }

  if (config.state.titles.opacity > 100) {
    config.state.titles.opacity = 100;
  }

  if (config.ctx && config.canvas) {
    // Determina que cor irá usar pra desenhar
    config.ctx.fillStyle = `rgba(10, 10, 10, ${
      config.state.titles.opacity / 100
    })`;

    // Preenche a tela com um retangulo
    config.ctx.rect(0, 0, config.canvas.width, config.canvas.height);

    // Renderiza
    config.ctx.fill();

    // Determina que cor irá usar pra desenhar
    config.ctx.fillStyle = `rgba(255, 255, 255, ${
      config.state.titles.opacity / 100
    })`;

    // Determina tamanho e fonte que usará
    config.ctx.font = `64px 'Germania One', cursive`;

    // Render animado
    config.ctx.fillText(
      config.state.titles.text,
      600,
      520 - easing(config.state.titles.opacity / 100) * 40
    );
  }

  if (config.state.titles.opacity == 100 && !config.input.jump) {
    config.state.titles.ready = true;
  }
}
