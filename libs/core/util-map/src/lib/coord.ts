import { Coord as ICoord } from '@death-tower/core/interfaces';

export class Coord implements ICoord {
  constructor(public x: number, public y: number) {  }
}
