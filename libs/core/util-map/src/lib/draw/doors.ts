import { Config } from '@death-tower/core/interfaces';

export function drawDoors(config: Config) {
  config.doors.forEach((door) => {
    if (door.x < config.state.pos.x - 40) return;

    if (door.x > config.state.pos.x + 220) return;

    door.draw(config);
  });
}
