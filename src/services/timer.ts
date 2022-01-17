import {
  take,
  timer,
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

  private _sub: Subscription | undefined

  constructor(readonly duration = 60) {
    this._countdown = new BehaviorSubject(duration)
    this._gameover = new BehaviorSubject(false)
  }

  start() {
    const sub = this._timeKeeper(this.duration)

    this._sub = sub.pipe(
    ).subscribe((time) => {
      const countdown = this.duration - time
      this._countdown.next(countdown)
      if (this._sub && countdown <= 0) {
        this._sub.unsubscribe()
      }
    })
  }

  reset() {
    if (this._sub) {
      this._sub.unsubscribe()
    }

    this.start()
  }

  private _timeKeeper(duration = this.duration) {
    const timeInterval = interval(1000)
    const timeRunsOut = timer((duration + 2) * 1000)
    return timeInterval.pipe(takeUntil(timeRunsOut))
  }
}
