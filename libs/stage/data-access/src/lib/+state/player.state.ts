import { interval, Subscription, take, timer } from 'rxjs';
import { State } from './state';

interface Player {
  score: number;
  paused: boolean;
  jumpingUp: boolean;
  jumpingDown: boolean;
  finished: boolean;
}

const initialState: Player = Object.freeze({
  score: 0,
  paused: false,
  jumpingUp: false,
  jumpingDown: false,
  finished: false,
});

export class PlayerState extends State<Player> {
  state$ = this.select((state) => state);
  score$ = this.select((state) => state.score);
  paused$ = this.select((state) => state.paused);
  jumpingUp$ = this.select((state) => state.jumpingUp);
  jumpingDown$ = this.select((state) => state.jumpingDown);
  finished$ = this.select((state) => state.finished);

  constructor() {
    super(initialState);
  }

  jump(dir: 'up' | 'down' = 'up') {
    this.setState({
      jumpingUp: dir === 'up',
      jumpingDown: dir === 'down',
    });
  }

  finish() {
    this.setState({ finished: true });
  }

  check(score: number) {
    this.setState({ score });
  }

  patch(state: Partial<Player>) {
    this.setState(state);
  }
}
