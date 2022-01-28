import { DefaultValueAccessor, FormControl, NgControl } from '@angular/forms';
import {
  Host,
  Self,
  Input,
  Component,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'death-slider',
  template: `
    <mat-slider
      thumbLabel
      [formControl]="control"
      [displayWith]="formatLabel"
      tickInterval="0.1"
      step="0.01"
      [min]="min"
      [max]="max"
      aria-label="units"
    >
    </mat-slider>
  `,
})
export class SliderComponent extends DefaultValueAccessor {
  @Input() min = 0;
  @Input() max = 0.1;

  get control() {
    return this.ngControl.control as FormControl;
  }

  constructor(
    renderer: Renderer2,
    elementRef: ElementRef,
    @Host() @Self() public ngControl: NgControl
  ) {
    super(renderer, elementRef, true);

    this.ngControl.valueAccessor = this;
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
}
