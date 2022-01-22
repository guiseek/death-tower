import { Config } from '../../types/config';
import { move } from './move';

export function keyDown(config: Config, e: KeyboardEvent) {
  move(config, e, true);
}
