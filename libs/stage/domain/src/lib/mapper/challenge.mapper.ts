import { Coord } from '@death-tower/core/util-map';
import { Mapper } from './mapper';

function toHex(x: number, y: number) {
  return x.toString(16) + ',' + y.toString(16);
}

function toCoord(x: string, y: string) {
  return {
    x: parseInt(x, 16),
    y: parseInt(y, 16),
  };
}

export class ChallengeMapper implements Mapper<string, Coord[]> {
  public mapFrom(query: string): Coord[] {
    return query
      .split(';')
      .map((coord) => coord.split(','))
      .map(([x, y]) => toCoord(x, y));
  }

  mapTo(coords: Coord[]): string {
    return coords.map(({ x, y }: Coord) => toHex(x, y)).join(';');
  }
}
