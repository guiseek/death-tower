import { OuterBox } from './outer-box';
import { Config } from './types/config';

export interface Platform {
  infront: boolean;

  outerBox: OuterBox<number, number> | null;

  x: number;
  y: number;
  n: number;

  getY(config: Config): number;

  isInFront(config: Config): boolean;

  drawFront(config: Config): void;

  draw(config: Config): void;
}
