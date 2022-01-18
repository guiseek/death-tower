import { Config } from '../../types/config';

export function resize(config: Config) {
  if (config.container && config.canvas) {
    config.rect = config.container.getBoundingClientRect();

    if (config.canvas.height > window.innerHeight) {
      // config.container!.style.transform = `scale(${
      //   window.innerHeight / config.canvas!.height
      // })`
    }
  }
}
