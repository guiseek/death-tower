import { Config } from '../../types/config';
import { audio } from './audio';
import { Door } from './door';

export function checkDoor(config: Config, door: Door) {
  if (Math.abs(door.x - (config.state.pos.x + 40)) < 10) {
    if (!config.state.finished) {
      config.state.finished = true;
      audio.yeaah.play();
    }
  }
}
