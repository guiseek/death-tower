import { StorageConfig } from '@death-tower/core/interfaces';
import { parsify } from '@death-tower/core/util-config';
import { UseCase } from './usecase';

export class LoadStorageUseCase
  implements UseCase<Partial<StorageConfig>, StorageConfig>
{
  execute(value: Partial<StorageConfig> = {}) {
    const storage = parsify({
      bricks: null,
      sky: null,
      shadows: null,
    });

    return {
      ...storage,
      ...value,
    };
  }
}
