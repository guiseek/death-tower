import { LevelRepository, LoadLevelUseCase } from '@death-tower/stage/domain';
import { Coord, Platform } from '@death-tower/core/util-map';
import { Level } from '@death-tower/core/interfaces';
import { interval, Subscription, take } from 'rxjs';
import { State } from './state';

interface Game {
  platforms: Platform[];
  coords: Coord[];
  levels: Level[];
  level: Level | null;
  seconds: number;
  timer: number;
  code: number | null;
}

const initialState: Game = Object.freeze({
  platforms: [],
  coords: [],
  level: null,
  seconds: 0,
  timer: 0,
  code: null,
  levels: [],
});

export class GameState extends State<Game> {
  public platforms$ = this.select((state) => state.platforms);

  public coords$ = this.select((state) => state.coords);
  public levels$ = this.select((state) => state.levels);
  public level$ = this.select((state) => state.level);

  public seconds$ = this.select((state) => state.seconds);
  public timer$ = this.select((state) => state.timer);

  public code$ = this.select((state) => state.code);

  loadLevelUseCase: LoadLevelUseCase;

  private _subscribers: Subscription[] = [];

  constructor(repository: LevelRepository) {
    super(initialState);

    this.loadLevelUseCase = new LoadLevelUseCase(repository);
  }

  loadLevel(id: string, queryParams = '') {
    const state$ = this.loadLevelUseCase.execute({ id, queryParams });

    state$.pipe(take(1)).subscribe((value) => this.setState(value));
  }

  start() {
    this.unsubscribe();

    const $timer = interval(1000)
      .pipe(take(this.state.seconds))
      .subscribe((timer) => this.setState({ timer }));

    this._subscribers.push($timer);
  }

  restart() {
    this.unsubscribe();

    this.setState(initialState);
  }

  unsubscribe() {
    this._subscribers.forEach((subscriber) => subscriber.unsubscribe());
    this._subscribers = [];
  }
}
