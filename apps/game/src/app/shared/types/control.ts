export type ControlAction = 'up' | 'down' | 'left' | 'right' | 'jump' | 'fullscreen';

export type ControlType = 'button' | 'joystick' | 'keyboard';

export type ControlTime = 'press' | 'hold' | 'release';

export interface ControlTouchEvent {
  action: ControlAction;
  time: ControlTime;
  event: TouchEvent;
}
export interface ControlActionEvent {
  event: TouchEvent | PointerEvent;
  action: ControlAction;
  time: ControlTime;
}
