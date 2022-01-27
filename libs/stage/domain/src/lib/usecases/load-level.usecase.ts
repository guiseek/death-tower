import { GetRandomCoordsUseCase } from './get-random-coords.usecase';
import { Coord, Level } from '@death-tower/core/interfaces';
import { Platform } from '@death-tower/core/util-map';
import { UseCase } from './usecase';

export class LoadLevelUseCase implements UseCase<Level, Platform[]> {
  constructor(
    private readonly getRandomCoordsUseCase: GetRandomCoordsUseCase
  ) {}

  execute(level: Level) {
    const length = ((level.x.min + level.x.max) / 2) | 0;

    const coords = this.getRandomCoordsUseCase.execute({ level, length });

    return coords.map(({ x, y }: Coord, i: number) => new Platform(x, y, i));
  }
}
