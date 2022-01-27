import { SettingsConfig } from '@death-tower/core/interfaces';
import { parsify } from '@death-tower/core/util-config';
import { UseCase } from './usecase';

export class LoadSettingsUseCase
  implements UseCase<Partial<SettingsConfig>, SettingsConfig>
{
  execute(value: Partial<SettingsConfig>) {
    const settings = parsify({
      maxSpeed: 0.09,
      minSpeed: 0.01,
      friction: 0.7,
      acceleration: 0.02,
      jump: {
        gravity: {
          boost: 0.0014,
          normal: 0.003,
          down: 0.004,
        },
        maxSpeed: 0.6,
        fallStartSpeed: 0.07,
        friction: 0.98,
      },
    });

    return {
      ...settings,
      ...value,
    };
  }
}
