import {
  BrickConfig,
  ColorsConfig,
  PlatformConfig,
  SkyConfig,
  TowerConfig,
} from '@death-tower/core/interfaces';
import { parsify } from '@death-tower/core/util-config';
import { UseCase } from './usecase';

export type SceneConfig = BrickConfig &
  PlatformConfig &
  TowerConfig &
  SkyConfig &
  ColorsConfig;

export class LoadTowerUseCase
  implements UseCase<Partial<SceneConfig>, SceneConfig>
{
  execute(value: Partial<SceneConfig>) {
    const tower = parsify({
      brick: {
        shine: '',
        shade: 'rgba(200, 200, 200, 0.8)',
        color: '#64696C',
        width: 16,
        height: 48,
        padding: 4,
      },
      platform: {
        height: 22,
        width: 13, /* <== em graus */
        color: '#5A4142',
      },
      tower: {
        width: 1200,
        shadowWidth: 100,
        skyWidth: 200,
      },
      sky: {
        bg: 'rgb(10, 21, 32)',
        starSizes: [3, 1, 2, 2],
        starColors: ['#f1f1f1', '#FFDCD4', '#7AEFFF', '#FFF385'],
      },
      colors: {
        bg: '#6A503E',
        wood1: '#6A503E',
        wood2: '#80604A',
        wood3: '#4B3937',
        wood4: '#6A503E',
        wood5: '#B46736',
      },
    });

    return {
      ...tower,
      ...value,
    };
  }
}
