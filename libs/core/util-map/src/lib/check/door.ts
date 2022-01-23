import { Config } from '@death-tower/core/interfaces';

export function checkDoor(config: Config) {
  if (!config.state.lastPlatform) return false;

  const platformCount = config.platforms.length;

  return config.state.lastPlatform.n === platformCount;

  // if (Math.abs(door.x - (config.state.pos.x + 40)) < 10) {
  //   if (!config.state.finished) {
  //     // config.state.finished = true
  //   }
  // }
}
