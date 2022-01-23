import { OuterBox } from './outer-box';
import { Config } from './types/config';

export interface Platform {
  n: number;

  infront: boolean;

  outerBox: OuterBox<number, number> | null;

  x: number;
  y: number;

  isInFront(config: Config): boolean;

  drawFront(config: Config): void;

  draw(config: Config): void;
}
