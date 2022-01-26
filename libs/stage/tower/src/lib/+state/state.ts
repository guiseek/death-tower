import { distinctUntilChanged, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

export abstract class State<T> {
  private _state: BehaviorSubject<T>;
  protected get state(): T {
    return this._state.getValue();
  }

  constructor(initialState: T) {
    this._state = new BehaviorSubject<T>(initialState);
  }

  protected select<K>(mapFn: (state: T) => K): Observable<K> {
    return this._state.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  protected setState(newState: Partial<T>) {
    this._state.next({
      ...this.state,
      ...newState,
    });
  }
}
