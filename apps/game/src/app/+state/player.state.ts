import { interval, take, timer } from 'rxjs';
import { State } from './state';

interface Player {
  score: number;
  seconds: number;
  paused: boolean;
  jumping: boolean;
  finished: boolean;
  gameover: boolean;
}

export class PlayerState extends State<Player> {
  state$ = this.select((state) => state);
  score$ = this.select((state) => state.score);
  paused$ = this.select((state) => state.paused);
  seconds$ = this.select((state) => state.seconds);
  jumping$ = this.select((state) => state.jumping);
  finished$ = this.select((state) => state.finished);
  gameover$ = this.select((state) => state.gameover);

  constructor(
    private initialState: Player = {
      score: 0,
      seconds: 60,
      paused: false,
      jumping: false,
      finished: false,
      gameover: false,
    }
  ) {
    super(initialState);
  }

  start(time = this.initialState.seconds) {
    const timerInterval$ = interval(1000).pipe(take(time));
    timerInterval$.subscribe(() => this.update());

    const timer$ = timer(time * 1000);
    timer$.pipe(take(1)).subscribe(() => this.gameover());
  }

  pause() {
    this.setState({ ...this.state, paused: true });
  }

  jump() {
    this.setState({ ...this.state, jumping: true });
  }

  finish() {
    this.setState({ ...this.state, finished: true });
  }

  up(value: number) {
    const score = this.state.score + value;
    this.setState({ ...this.state, score });
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
    this.setState({ ...this.state, ...state });
  }

  gameover() {
    this.setState({ gameover: true });
  }
}
