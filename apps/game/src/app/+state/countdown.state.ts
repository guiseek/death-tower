import { interval, take, timer } from 'rxjs';
import { State } from './state';

interface Countdown {
  seconds: number;
  gameover: boolean;
}

export class CountdownState extends State<Countdown> {
  countdown$ = this.select((state) => state);

  seconds$ = this.select((state) => state.seconds);

  gameover$ = this.select((state) => state.gameover);

  constructor(initialState: Countdown = { seconds: 60, gameover: false }) {
    super(initialState);
  }

  start(time = 60) {
    const timerInterval$ = interval(1000).pipe(take(time));
    timerInterval$.subscribe(() => this.update());

    const timer$ = timer(time * 1000);
    timer$.pipe(take(1)).subscribe(() => this.gameover());
  }

  update() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    }
  }

  reset() {
    this.setState({ seconds: 0, gameover: false });
  }

  gameover() {
    this.setState({ gameover: true });
  }
}
