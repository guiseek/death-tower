import { LoadAnimationFramesUseCase } from './load-animation-frames.usecase';
import { DOMConfig } from '@death-tower/core/interfaces';
import { UseCase } from './usecase';

export class LoadDomUseCase implements UseCase<Partial<DOMConfig>, DOMConfig> {
  constructor(
    private readonly animationFramesUseCase: LoadAnimationFramesUseCase
  ) {}

  execute(value: Partial<DOMConfig>) {
    let { container, canvas } = value;

    if (!container) {
      container = document.createElement('div');
    }

    if (!canvas) {
      canvas = document.createElement('canvas');
    }

    const animationFrames = this.animationFramesUseCase.execute({});

    const ctx = canvas.getContext('2d');

    const rect = container.getBoundingClientRect();

    const dom = { container, canvas, ctx, rect, animationFrames };

    return { ...dom, ...value };
  }
}
