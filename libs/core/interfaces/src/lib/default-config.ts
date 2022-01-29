import { ControlAction } from './types/control';
import { BrickConfig } from './brick-config';
import { ColorsConfig } from './colors-config';
import { PlatformConfig } from './platform-config';
import { SkyConfig } from './sky-config';
import { StorageConfig } from './storage-config';
import { TowerConfig } from './tower-config';

export interface DefaultConfig {
  brick: BrickConfig;
  platform: PlatformConfig;
  tower: TowerConfig;
  sky: SkyConfig;
  colors: ColorsConfig;
  storage: StorageConfig;
  input: Record<ControlAction, boolean>;
}
