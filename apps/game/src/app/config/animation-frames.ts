/**
 * PLAYER_FRAMES_CONFIG
 * FRAMES_CONFIG_VALUE
 */
const standing = '../assets/player/burn/state=standing.png';
const jumping = '../assets/player/burn/state=jumping-up.png';
const jumpingdown = '../assets/player/burn/state=jumping-down.png';
const jumpingtrick = '../assets/player/burn/state=jumping-trick.png';
const running = '../assets/player/burn/state=running.png';
const walking = '../assets/player/burn/state=walking.png';
const fall1 = '../assets/player/burn/state=fall-1.png';
const fall2 = '../assets/player/burn/state=fall-2.png';

const frontFlip1 = '../assets/player/burn/state=front-flip-1.png';
const frontFlip2 = '../assets/player/burn/state=front-flip-2.png';
const frontFlip3 = '../assets/player/burn/state=front-flip-3.png';
const frontFlip4 = '../assets/player/burn/state=front-flip-4.png';
const frontFlip5 = '../assets/player/burn/state=front-flip-5.png';
const frontFlip6 = '../assets/player/burn/state=front-flip-6.png';
const frontFlip7 = '../assets/player/burn/state=front-flip-7.png';

export const FRAMES_CONFIG_VALUE = [
  [standing, 'standing', 0, false],
  [standing, 'standing', 1, true],
  [jumping, 'jumpingUp', 0, false],
  [jumping, 'jumpingUp', 1, true],
  [jumpingdown, 'jumpingDown', 0, false],
  [jumpingdown, 'jumpingDown', 1, true],

  [jumpingtrick, 'jumpingTrick', 0, false],
  [jumpingtrick, 'jumpingTrick', 1, true],

  [running, 'runningLeft', 0, false],
  [running, 'runningLeft', 1, false],
  [running, 'runningRight', 0, true],
  [running, 'runningRight', 1, true],

  [walking, 'runningRight', 2, true],
  [walking, 'runningLeft', 2, false],
  [walking, 'runningLeft', 3, false],
  [walking, 'runningRight', 3, true],

  [fall1, 'fall1', 0, false],
  [fall1, 'fall1', 1, true],

  [fall2, 'fall2', 0, false],
  [fall2, 'fall2', 1, true],

  [frontFlip1, 'frontFlip', 0, false],
  [frontFlip1, 'frontFlip', 1, true],

  [frontFlip2, 'frontFlip', 0, false],
  [frontFlip2, 'frontFlip', 1, true],

  [frontFlip3, 'frontFlip', 0, false],
  [frontFlip3, 'frontFlip', 1, true],

  [frontFlip4, 'frontFlip', 0, false],
  [frontFlip4, 'frontFlip', 1, true],

  [frontFlip5, 'frontFlip', 0, false],
  [frontFlip5, 'frontFlip', 1, true],

  [frontFlip6, 'frontFlip', 0, false],
  [frontFlip6, 'frontFlip', 1, true],

  [frontFlip7, 'frontFlip', 0, false],
  [frontFlip7, 'frontFlip', 1, true],

];
