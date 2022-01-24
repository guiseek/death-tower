import { interval, Subscription, take, takeWhile, timer } from 'rxjs';
import { State } from './state';

interface Player {
  score: number;
  seconds: number;
  paused: boolean;
  jumpingUp: boolean;
  jumpingDown: boolean;
  finished: boolean;
  gameover: boolean;
}

export class PlayerState extends State<Player> {
  state$ = this.select((state) => state);
  score$ = this.select((state) => state.score);
  paused$ = this.select((state) => state.paused);
  seconds$ = this.select((state) => state.seconds);
  jumpingUp$ = this.select((state) => state.jumpingUp);
  jumpingDown$ = this.select((state) => state.jumpingDown);
  finished$ = this.select((state) => state.finished);
  gameover$ = this.select((state) => state.gameover);

  private _timerInterval: Subscription | null = null

  constructor(
    private initialState: Player = Object.freeze({
      score: 0,
      seconds: 60,
      paused: false,
      jumpingUp: false,
      jumpingDown: false,
      finished: false,
      gameover: false,
    })
  ) {
    super(initialState);
  }

  start(time = this.initialState.seconds) {
    if (this._timerInterval) {
      this._timerInterval.unsubscribe()
    }

    const timerInterval$ = interval(1000).pipe(take(time));
    this._timerInterval = timerInterval$.subscribe(() => this.update());

    const timer$ = timer(time * 1000);
    timer$.pipe(take(1)).subscribe(() => this.gameover());
  }

  continue() {
    this.setState({ paused: false, gameover: false });
  }

  restart() {
    this.setState(this.initialState);
  }

  pause() {
    this.setState({ paused: true });

    if (this._timerInterval) {
      this._timerInterval.unsubscribe()
    }
  }

  jump(dir: 'up' | 'down' = 'up') {
    this.setState({
      jumpingUp: dir === 'up',
      jumpingDown: dir === 'down',
    });
  }

  finish() {
    this.setState({ finished: true });

    if (this._timerInterval) {
      this._timerInterval.unsubscribe()
    }
  }

  up(value: number) {
    const score = this.state.score + value;
    this.setState({ score });
  }

  update() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    }
  }

  reset(seconds = this.initialState.seconds) {
    this.setState({ seconds, gameover: false });
  }

  patchValue(state: Partial<Player>) {
    this.setState(state);
  }

  gameover() {
    this.setState({ gameover: true });
  }
}
