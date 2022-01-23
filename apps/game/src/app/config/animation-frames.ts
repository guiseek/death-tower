import { loadImage } from '@death-tower/core/util-config';
import { Config } from '@death-tower/core/interfaces';

const standing = '../assets/player/burn/state=standing.png';
const jumping = '../assets/player/burn/state=jumping-up.png';
const jumpingdown = '../assets/player/burn/state=jumping-down.png';
const running = '../assets/player/burn/state=running.png';
const walking = '../assets/player/burn/state=walking.png';

export function loadImages(config: Config) {
  loadImage(config, standing, 'standing', 0, false)
  loadImage(config, standing, 'standing', 1, true)
  loadImage(config, jumping, 'jumpingUp', 0, false)
  loadImage(config, jumping, 'jumpingUp', 1, true)
  loadImage(config, jumpingdown, 'jumpingDown', 0, false)
  loadImage(config, jumpingdown, 'jumpingDown', 1, true)

  loadImage(config, running, 'runningLeft', 0, false)
  loadImage(config, running, 'runningLeft', 1, false)
  loadImage(config, running, 'runningRight', 0, true)
  loadImage(config, running, 'runningRight', 1, true)

  loadImage(config, walking, 'runningRight', 2, true)
  loadImage(config, walking, 'runningLeft', 2, false)
  loadImage(config, walking, 'runningLeft', 3, false)
  loadImage(config, walking, 'runningRight', 3, true)
}

