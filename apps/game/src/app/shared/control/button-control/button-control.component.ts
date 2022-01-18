import { ControlActionEvent, ControlAction } from '../../types/control';
import {
  Input,
  Output,
  Component,
  EventEmitter,
  HostListener,
  ChangeDetectionStrategy,
} from '@angular/core';


@Component({
  selector: 'button[dt-control],dt-control',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./button-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonControlComponent {
  @Output() public touch: EventEmitter<ControlActionEvent> = new EventEmitter();

  @Input() public action: ControlAction = 'jump';

  @HostListener('touchstart', ['$event'])
  public onTouchStart(event: TouchEvent): void {
    this.touch.emit({ event, action: this.action, time: 'press' });
  }

  @HostListener('click', ['$event'])
  public onClick(event: PointerEvent): void {
    this.touch.emit({ event, action: this.action, time: 'press' });
  }

  @HostListener('touchend', ['$event'])
  public onTouchEnd(event: TouchEvent): void {
    this.touch.emit({ event, action: this.action, time: 'hold' });
  }
}
