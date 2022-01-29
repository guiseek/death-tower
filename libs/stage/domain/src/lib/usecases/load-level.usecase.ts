import { Coord, Level } from '@death-tower/core/interfaces';
import { Platform } from '@death-tower/core/util-map';
import { UseCase } from './usecase';
import { TowerLevelRepository } from '@death-tower/stage/data-access';
import { ChallengeMapper } from '../mapper/challenge.mapper';
import { map, take } from 'rxjs';

interface LevelInput {
  id: string;
  queryParams: string;
}

interface LevelOutput {
  coords: Coord[];
  level: string;
  platforms: Platform[];
  code: number | null;
}

export class LoadLevelUseCase implements UseCase<LevelInput, LevelOutput> {
  challengeMapper = new ChallengeMapper();

  constructor(private repository: TowerLevelRepository) {}

  execute({ id, queryParams = '' }: LevelInput) {
    const predicate = (l: Level) => l.id === id;

    return this.repository
      .getAll()
      .pipe(
        take(1),
        map((levels) => {
          let level = levels.find(predicate);
          if (!level) level = levels[0];

          const challengeCoords = queryParams
            ? this.challengeMapper.mapFrom(queryParams)
            : [];

          let code = null;
          let coords: Coord[] = [];

          if (id === 'challenge' && challengeCoords.length > 0) {
            coords = this.challengeMapper.mapFrom(queryParams);
            code = this.getCodeCoords(coords);
          } else {
            coords = this.getRandomCoords(level, 36);
          }

          const platforms = coords.map(
            ({ x, y }: Coord, i: number) => new Platform(x, y, i)
          );

          return { coords, level, platforms, code };
        })
      )
  }

  private getCodeCoords(coords: Coord[]) {
    const coord = coords.reduce(
      (prev, curr) => {
        return { y: (prev.y += curr.y), x: (prev.x += curr.x) };
      },
      { x: 0, y: 0 }
    );

    return coord.x - coord.y;
  }

  private getRandomCoords(level: Level, length = 40) {
    let x = 0;
    let y = 0;

    const between = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return new Array(length).fill({ x, y }).map(() => {
      x = x === 0 ? 1600 : between(x - level.x.min, x - level.x.max);

      y =
        y === 0 ? 600 : between(y - (level.y.min - 20), y - level.y.max * 2.5);

      return { x, y };
    });
  }
}
