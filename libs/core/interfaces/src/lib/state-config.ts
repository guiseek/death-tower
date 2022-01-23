import { TextMessage } from './text-message';
import { ClimpSpeed } from './climp-speed';
import { Platform } from './platform';
import { Player } from './player';
import { Coord } from './coord';
import { Jump } from './jump';

export interface StateConfig {
  points: number;
  lastPlatform: Platform | null;
  platformReached: Platform | null;
  paused: boolean;
  finished: boolean;
  titles: TextMessage;
  winner: TextMessage;
  climbstarted: boolean;
  time: number | null;
  dt: number | null;
  climbspeed: ClimpSpeed;
  pos: Coord;
  lastPos: Coord;
  activePlatforms: Platform[];
  jump: Jump;
  player: Player;
}
