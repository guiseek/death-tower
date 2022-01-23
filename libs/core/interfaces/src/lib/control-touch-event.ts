import { ControlAction, ControlTime } from './types/control';

export interface ControlTouchEvent {
  action: ControlAction;
  time: ControlTime;
  event: TouchEvent;
}
