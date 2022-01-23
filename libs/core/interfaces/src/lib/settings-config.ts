import { JumpConfig } from './jump-config';

export interface SettingsConfig {
  maxSpeed: number;
  minSpeed: number;
  friction: number;
  acceleration: number;
  jump: JumpConfig;
}
