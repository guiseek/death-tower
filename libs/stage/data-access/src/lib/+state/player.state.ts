import { SoundConfig } from '@death-tower/core/interfaces';
import { takeUntil, Observable } from 'rxjs';
import { State } from './state';

interface Player {
  score: number;
  paused: boolean;
  muted: boolean;
  jumpingUp: boolean;
  jumpingDown: boolean;
  finished: boolean;
}

const initialState: Player = Object.freeze({
  score: 0,
  paused: false,
  muted: false,
  jumpingUp: false,
  jumpingDown: false,
  finished: false,
});

export class PlayerState extends State<Player> {
  state$ = this.select((state) => state);
  score$ = this.select((state) => state.score);
  muted$ = this.select((state) => state.muted);
  paused$ = this.select((state) => state.paused);
  jumpingUp$ = this.select((state) => state.jumpingUp);
  jumpingDown$ = this.select((state) => state.jumpingDown);
  finished$ = this.select((state) => state.finished);

  get muted() {
    return this.state.muted;
  }

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

  mute() {
    this.setState({ muted: true });
    this.storage.setItem('muted', 'true');
  }

  unmute() {
    this.setState({ muted: false });
    this.storage.setItem('muted', 'false');
  }

  patch(state: Partial<Player>) {
    this.setState(state);
  }

  listen(soundConfig: SoundConfig, destroy: Observable<void>) {
    this.setState({ muted: this.storage.getItem('muted') === 'true' });

    this.paused$.pipe(takeUntil(destroy)).subscribe((paused) => {
      if (paused && !this.state.muted) soundConfig.scream.play();
    });

    this.finished$.pipe(takeUntil(destroy)).subscribe((finished) => {
      if (finished && !this.state.muted) {
        soundConfig.yeaah.play();
      }
    });

    this.jumpingUp$.pipe(takeUntil(destroy)).subscribe((jump) => {
      if (jump && soundConfig.jumpingUp.paused && !this.state.muted) {
        soundConfig.jumpingUp.play();
      }
    });

    this.jumpingDown$.pipe(takeUntil(destroy)).subscribe((jump) => {
      if (jump && soundConfig.jumpingDown.paused && !this.state.muted) {
        soundConfig.jumpingDown.play();
      }
    });
  }

  get storage() {
    return window.localStorage
  }
}
