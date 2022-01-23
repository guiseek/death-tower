import { Config, Platform } from '@death-tower/core/interfaces';

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
