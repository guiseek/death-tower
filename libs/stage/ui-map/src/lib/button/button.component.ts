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
  selector: 'button[map-control],map-control',
  template: `<span><ng-content></ng-content></span>`,
  styles: [
    `
      :host {
        width: var(--button-size);
        height: var(--button-size);
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1.6px dashed rgba(var(--color-text), 0.5);
        background-color: transparent;
      }

      :host > span {
        width: calc(var(--button-size) - 8px);
        height: calc(var(--button-size) - 8px);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(var(--color-bg), 0.78);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  private _size = 52;

  @Input() set size(value: number) {
    this._size = value;
  }

  @HostBinding('attr.style') get buttonSize() {
    return `--button-size: ${this._size}px;`;
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
    this._elRef.nativeElement.blur();
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    this.touchEnd.emit({ event, action: this.action, time: 'hold' });
  }

  constructor(private _elRef: ElementRef<HTMLButtonElement>) {}
}
