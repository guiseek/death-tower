import { InputConfig } from '@death-tower/core/interfaces';
import { parsify } from '@death-tower/core/util-config';
import { UseCase } from './usecase';

export class LoadInputUseCase
  implements UseCase<Partial<InputConfig>, InputConfig>
{
  execute(value: Partial<InputConfig>) {
    const input = parsify({
      left: false,
      right: false,
      jump: false,
      fullscreen: false,
    });

    return {
      ...input,
      ...value,
    };
  }
}
