import { ControlAction, ControlTime } from './types/control';

export interface ControlActionEvent {
  event: TouchEvent | PointerEvent;
  action: ControlAction;
  time: ControlTime;
}
