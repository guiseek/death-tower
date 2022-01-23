import { GravityConfig } from './gravity-config';

export interface JumpConfig {
  gravity: GravityConfig;
  maxSpeed: number;
  fallStartSpeed: number;
  friction: number;
}
