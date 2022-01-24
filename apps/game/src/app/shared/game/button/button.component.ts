import {
  Input,
  Output,
  Component,
  EventEmitter,
  HostListener,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  ControlAction,
  ControlActionEvent,
} from '@death-tower/core/interfaces';

@Component({
  selector: 'button[dt-control],dt-control',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        width: 64px;
        height: 64px;
        padding: 16px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #000;
        border: 2px solid #f1f1f1;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Output() public touch: EventEmitter<ControlActionEvent> = new EventEmitter();
  @Output() public touchStart: EventEmitter<ControlActionEvent> = new EventEmitter();
  @Output() public touchEnd: EventEmitter<ControlActionEvent> = new EventEmitter();

  @Input() public action: ControlAction = 'jump';

  @HostListener('touchstart', ['$event'])
  public onTouchStart(event: TouchEvent): void {
    this.touchStart.emit({ event, action: this.action, time: 'press' });
  }

  @HostListener('click', ['$event'])
  public onClick(event: PointerEvent): void {
    this.touch.emit({ event, action: this.action, time: 'press' });
  }

  @HostListener('touchend', ['$event'])
  public onTouchEnd(event: TouchEvent): void {
    this.touchEnd.emit({ event, action: this.action, time: 'hold' });
  }
}
