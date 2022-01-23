import { AnimationFramesConfig, DOMConfig } from '@death-tower/core/interfaces';

export function configAnimationFrame(
  config: DOMConfig,
  key: keyof AnimationFramesConfig,
  canvas: HTMLCanvasElement
) {
  if (config.animationFrames[key]) {
    config.animationFrames[key].push(canvas);
  } else {
    config.animationFrames[key] = [];
    config.animationFrames[key].push(canvas);
  }
}
