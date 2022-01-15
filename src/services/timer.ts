import { interval, map, takeUntil, timer } from 'rxjs'

export class TimerService {
  start(duration = 60) {
    return this._timeKeeper(duration)
  }

  reset(duration = 60) {
    return this._timeKeeper(duration)
  }

  private _timeKeeper(duration = 60) {
    const timeInterval = interval(1000)
    const timeRunsOut = timer(duration * 1000)
    return timeInterval.pipe(
      takeUntil(timeRunsOut),
      map((value) => duration - value)
    )
  }
}
