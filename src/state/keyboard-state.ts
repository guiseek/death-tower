import { distinctUntilChanged } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs'

type KeyState =
  | 'left'
  | 'right'
  | 'up'
  | 'down'
  | 'space'
  | 'enter'
  | 'escape'
  | 'tab'
  | 'backspace'
  | 'delete'
  | 'control'
  | 'shift'
  | 'alt'
  | 'meta'
  | 'capslock'
  | 'f1'
  | 'f2'
  | 'f3'
  | 'f4'
  | 'f5'
  | 'f6'
  | 'f7'
  | 'f8'
  | 'f9'
  | 'f10'
  | 'f11'
  | 'f12'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'

type KeyArrow = 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown'

class KeyboardState {
  private state = new BehaviorSubject<KeyState | null>(null)
  state$ = this.state
    .asObservable()
    .pipe(distinctUntilChanged((prev, curr) => prev === curr))

  private _arrows: KeyArrow[] = [
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
  ]

  private _getArrow(key: string): KeyState
  private _getArrow(key: KeyArrow): KeyState {
    switch (key) {
      case 'ArrowLeft':
        return 'left'
      case 'ArrowRight':
        return 'right'
      case 'ArrowUp':
        return 'up'
      case 'ArrowDown':
        return 'down'
    }
  }

  private _inArrows(key: string): boolean
  private _inArrows(key: KeyArrow): boolean {
    return this._arrows.includes(key)
  }
  
  private _isSpace(key: string): boolean {
    return key === ' '
  }

  private _getKey(key: string) {
    return key.toLowerCase() as KeyState
  }

  private _getState(key: string) {
    if (this._inArrows(key)) {
      return this._getArrow(key)
    } else if (this._isSpace(key)) {
      return 'space'
    } else {
      return this._getKey(key)
    }
  }

  private _setState = (e: KeyboardEvent) => {
    this.state.next(this._getState(e.key))
  }

  initialize() {
    window.addEventListener('keydown', this._setState)

    window.addEventListener('keyup', this._setState)
  }

  stop() {
    window.removeEventListener('keydown', this._setState)

    window.removeEventListener('keyup', this._setState)
  }
}

const keyboardState = new KeyboardState()

export { keyboardState }
