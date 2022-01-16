import {
  map,
  take,
  timer,
  finalize,
  interval,
  takeUntil,
  Subscription,
  BehaviorSubject,
} from 'rxjs'

export class TimerService {
  get countdown$() {
    return this._countdown.asObservable()
  }

  get gameover$() {
    return this._gameover.asObservable().pipe(take(1))
  }

  private _gameover
  private _countdown
  
  private _subscription: Subscription | undefined

  constructor(readonly duration = 60) {
    this._countdown = new BehaviorSubject(duration)
    this._gameover = new BehaviorSubject(false)
  }

  start() {
    const sub = this._timeKeeper(this.duration)

    this._subscription = sub
      .pipe(
        map((value) => this.duration - value),
        finalize(() => this._gameover.next(true))
      )
      .subscribe((time) => this._countdown.next(time))
  }

  reset() {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }

    this.start()
  }

  private _timeKeeper(duration = this.duration) {
    const timeInterval = interval(1000)
    const timeRunsOut = timer(duration * 1000)
    return timeInterval.pipe(takeUntil(timeRunsOut))
  }
}
