import { TowerLevelRepository } from '@death-tower/stage/data-access';
import { Coord, Platform } from '@death-tower/core/util-map';
import { LoadLevelUseCase } from '@death-tower/stage/domain';
import { Level } from '@death-tower/core/interfaces';
import { State } from './state';
import { take } from 'rxjs';


interface Game {
  platforms: Platform[];
  coords: Coord[];
  levels: Level[];
  level: Level | null;
  code: number | null;
}

const initialState: Game = Object.freeze({
  platforms: [],
  coords: [],
  level: null,
  code: null,
  levels: []
});

export class GameState extends State<Game> {
  public platforms$ = this.select((state) => state.platforms);
  public coords$ = this.select((state) => state.coords);
  public levels$ = this.select((state) => state.levels);
  public level$ = this.select((state) => state.level);
  public code$ = this.select((state) => state.code);

  loadLevelUseCase: LoadLevelUseCase

  constructor(repository: TowerLevelRepository) {
    super(initialState);

    this.loadLevelUseCase = new LoadLevelUseCase(repository);
  }

  loadLevel(id: string, queryParams = '') {
    const level$ = this.loadLevelUseCase.execute({ id, queryParams })

    level$.pipe(take(1)).subscribe((level) => this.setState(level));
  }
}
