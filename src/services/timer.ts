import {
  BehaviorSubject,
  interval,
  map,
  startWith,
  Subscription,
  takeUntil,
  timer,
} from 'rxjs'

export class TimerService {
  
  get countdown$() {
    return this._countdown.asObservable()
  }
  
  private _countdown
  private _subscription?: Subscription

  constructor(readonly duration = 60) {
    this._countdown = new BehaviorSubject(duration)
  }

  start() {
    const sub = this._timeKeeper(this.duration)
    
    this._subscription = sub
      .pipe(
        map((value) => {
          console.log(`${this.duration} - ${value} = ${this.duration - value}`);
          return this.duration - value
          
        })
      )
      .subscribe((time) => {
        console.log(time);
        this._countdown.next(time)
        
      })
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
