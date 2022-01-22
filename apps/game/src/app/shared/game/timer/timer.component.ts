import { DefaultValueAccessor, FormControl, NgControl } from '@angular/forms';
import {
  Self,
  Optional,
  Component,
  Renderer2,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'dt-timer',
  template: `
    <input
      readonly
      value="0"
      id="seconds"
      mode="numeric"
      name="seconds"
      [formControl]="control"
      aria-label="Segundos"
    />
    <label for="seconds">segundos</label>
  `,
  styles: [
    `
      :host {
        display: flex;
        gap: 10px;

        input {
          border: none;
          outline: none;
          color: white;
          text-align: end;
          min-width: 20px;
          max-width: 100px;
          user-select: none;
          font-size: var(--font-size);
          background-color: transparent;
        }
      }
    `
  ],
})
export class TimerComponent extends DefaultValueAccessor {
  get control() {
    return this.ngControl.control as FormControl;
  }

  constructor(
    @Self()
    @Optional()
    public ngControl: NgControl,
    renderer: Renderer2,
    element: ElementRef
  ) {
    super(renderer, element, true);

    this.ngControl.valueAccessor = this;
  }
}
