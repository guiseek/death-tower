import { Coord } from '@death-tower/core/util-map';
import { Mapper } from './mapper';

function toHex({ x, y }: Coord) {
  return x.toString(16) + ',' + y.toString(16);
}

function toCoord([x, y]: string[]) {
  return {
    x: parseInt(x, 16),
    y: parseInt(y, 16),
  };
}

export class ChallengeMapper implements Mapper<string, Coord[]> {
  public mapFrom(query: string): Coord[] {
    const mapStr = (coord: string) => coord.split(',');
    return query.split(';').map(mapStr).map(toCoord);
  }

  mapTo(coords: Coord[]): string {
    return coords.map(toHex).join(';');
  }
}
