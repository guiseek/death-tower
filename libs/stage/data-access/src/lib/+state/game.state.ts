import { TowerLevelRepository } from '../repository/tower-level.repository';
import { Coord, Platform } from '@death-tower/core/util-map';
import { LoadLevelUseCase } from '@death-tower/stage/domain';
import { Level, Range } from '@death-tower/core/interfaces';
import { State } from './state';
import { take } from 'rxjs';

interface Game {
  platforms: Platform[];
  coords: Coord[];
  levels: Level[];
  level: Level | null;
  speed: Range;
  acceleration: number;
  code: number | null;
}

const initialState: Game = Object.freeze({
  platforms: [],
  coords: [],
  level: null,
  jump: 0.6,
  acceleration: 0.02,
  speed: { min: 0.01, max: 0.06 },
  code: null,
  levels: [],
});

export class GameState extends State<Game> {
  public platforms$ = this.select((state) => state.platforms);
  public coords$ = this.select((state) => state.coords);
  public levels$ = this.select((state) => state.levels);
  public level$ = this.select((state) => state.level);
  public speed$ = this.select((state) => state.speed);
  public acceleration$ = this.select((state) => state.acceleration);
  public code$ = this.select((state) => state.code);

  loadLevelUseCase: LoadLevelUseCase;

  constructor(repository: TowerLevelRepository) {
    super(initialState);

    this.loadLevelUseCase = new LoadLevelUseCase(repository);
  }

  loadLevel(id: string, queryParams = '') {
    const level$ = this.loadLevelUseCase.execute({ id, queryParams });

    level$.pipe(take(1)).subscribe((level) => this.setState(level));
  }
}
