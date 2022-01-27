import { AnimationFramesConfig } from '@death-tower/core/interfaces';
import { parsify } from '@death-tower/core/util-config';
import { OffScreen } from '@death-tower/core/util-map';
import { UseCase } from './usecase';

export class LoadAnimationFramesUseCase
  implements UseCase<Partial<AnimationFramesConfig>, AnimationFramesConfig>
{
  execute(value: Partial<AnimationFramesConfig>) {
    const offScreen = new OffScreen(10, 10);
    const fallbackCanvas = offScreen.canvas;

    const input = parsify({
      standing: [fallbackCanvas, fallbackCanvas],
      jumpingUp: [fallbackCanvas, fallbackCanvas],
      jumpingDown: [fallbackCanvas, fallbackCanvas],
      runningLeft: [
        fallbackCanvas,
        fallbackCanvas,
        fallbackCanvas,
        fallbackCanvas,
      ],
      runningRight: [
        fallbackCanvas,
        fallbackCanvas,
        fallbackCanvas,
        fallbackCanvas,
      ],
    });

    return {
      ...input,
      ...value,
    };
  }
}

