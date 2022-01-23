import { Config } from './types/config';

export interface Door {
  x: number;
  y: number;

  draw(config: Config): void;
}
