import { DefaultValueAccessor, FormControl, NgControl } from '@angular/forms';
import {
  Self,
  Optional,
  Component,
  Renderer2,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'dt-score',
  template: `
    <input
      readonly
      value="0"
      id="score"
      mode="numeric"
      name="score"
      [formControl]="control"
      aria-label="Pontos"
    />
    <label for="score">pontos</label>
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
export class ScoreComponent extends DefaultValueAccessor {
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
