import { distinctUntilChanged, map } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs'

export abstract class State<T> {
  private state$: BehaviorSubject<T>
  protected get state(): T {
    return this.state$.getValue()
  }

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject<T>(initialState)
  }

  protected select<K>(mapFn: (state: T) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    )
  }

  protected setState(newState: Partial<T>) {
    this.state$.next({
      ...this.state,
      ...newState,
    })
  }
}