import { interval, Subscription, take, timer } from 'rxjs';
import { State } from './state';

interface Player {
  score: number;
  seconds: number;
  paused: boolean;
  jumpingUp: boolean;
  jumpingDown: boolean;
  finished: boolean;
}

const initialState: Player = Object.freeze({
  score: 0,
  seconds: 60,
  paused: false,
  jumpingUp: false,
  jumpingDown: false,
  finished: false,
});

export class PlayerState extends State<Player> {
  state$ = this.select((state) => state);
  score$ = this.select((state) => state.score);
  paused$ = this.select((state) => state.paused);
  seconds$ = this.select((state) => state.seconds);
  jumpingUp$ = this.select((state) => state.jumpingUp);
  jumpingDown$ = this.select((state) => state.jumpingDown);
  finished$ = this.select((state) => state.finished);

  private _subscribers: Subscription[] = [];

  constructor() {
    super(initialState);
  }

  start(time = initialState.seconds) {
    this.unsubscribe();

    const timerInterval$ = interval(1000).pipe(take(time));
    this._subscribers.push(timerInterval$.subscribe(() => this.update()));

    const timer$ = timer(time * 1000);
    this._subscribers.push(
      timer$.pipe(take(1)).subscribe(() => this.pause())
    );
  }

  restart() {
    this.unsubscribe();

    this.setState(initialState);
  }

  pause() {
    this.setState({ paused: true });

    this.unsubscribe();
  }

  jump(dir: 'up' | 'down' = 'up') {
    this.setState({
      jumpingUp: dir === 'up',
      jumpingDown: dir === 'down',
    });
  }

  finish() {
    this.setState({ finished: true });

    this.unsubscribe();
  }

  check(score: number) {
    this.setState({ score });
  }

  update() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    }
  }

  reset(seconds = initialState.seconds) {
    this.setState({ seconds });
  }

  patch(state: Partial<Player>) {
    this.setState(state);
  }

  private unsubscribe() {
    while (this._subscribers.length) {
      const sub = this._subscribers.pop();
      if (sub) sub.unsubscribe();
    }
  }
}
