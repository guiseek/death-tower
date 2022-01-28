import {
  Input,
  Output,
  Component,
  EventEmitter,
  HostListener,
  ChangeDetectionStrategy,
  HostBinding,
  ElementRef,
} from '@angular/core';
import {
  ControlAction,
  ControlActionEvent,
} from '@death-tower/core/interfaces';

@Component({
  selector: 'button[death-control],death-control',
  template: `<ng-content></ng-content>`,
  styles: [
    `
    :host {
        width: var(--button-size);
        height: var(--button-size);
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
  private _size = 64

  @Input() set size(value: number) {
    this._size = value;
  }

  @HostBinding('attr.style') get buttonSize() {
    return `--button-size: ${this._size}px;`
  }

  @Input() action: ControlAction = 'jump';

  @Output() touch: EventEmitter<ControlActionEvent> = new EventEmitter();
  @Output() touchStart: EventEmitter<ControlActionEvent> = new EventEmitter();
  @Output() touchEnd: EventEmitter<ControlActionEvent> = new EventEmitter();

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.touchStart.emit({ event, action: this.action, time: 'press' });
  }

  @HostListener('click', ['$event'])
  onClick(event: PointerEvent): void {
    this.touch.emit({ event, action: this.action, time: 'press' });
    this.elRef.nativeElement.blur();
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    this.touchEnd.emit({ event, action: this.action, time: 'hold' });
  }

  constructor(private elRef: ElementRef<HTMLButtonElement>) {}
}
