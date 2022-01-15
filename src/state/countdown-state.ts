import { interval, switchMap, take, takeUntil, takeWhile } from 'rxjs'
import { State } from './state'

interface Countdown {
  seconds: number
  active: boolean
}

export class CountdownState extends State<Countdown> {
  seconds$ = this.select((state) => state.seconds)
  active$ = this.select((state) => state.active)

  constructor() {
    super({
      seconds: 0,
      active: false,
    })
  }

  start(seconds: number) {
    interval(1000)
      .pipe(
        // take(seconds),
        switchMap(() => this.seconds$),
        // takeUntil(this.select((state) => state.active)),
        takeWhile((x) => x > 0)
      )
      .subscribe(() => {
        this.setState({ seconds: this.state.seconds - 1 })
      })

    this.setState({ seconds, active: true })
  }

  reset() {
    this.setState({ seconds: 0 })
  }

  resume() {
    this.setState({ active: true })
  }

  pause() {
    this.setState({ active: false })
  }
}
