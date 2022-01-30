import { Range } from './range';

export interface Level {
  id: string;
  name: string;
  platforms: {
    x: Range;
    y: Range;
  }
  speed: Range;
  jump: number;
  acceleration: number;
}
