import { Coord as ICoord } from '@death-tower/core/interfaces';

export class Cood implements ICoord {
  constructor(public x: number, public y: number) {  }
}
