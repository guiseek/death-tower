import { Component, Input } from '@angular/core';

@Component({
  selector: 'death-timer',
  template: `
    <h3>{{ value }}</h3>
    <span>segundos</span>
  `,
  styles: [
    `
      :host {
        display: flex;
        gap: 10px;

        min-width: 20px;
        max-width: 200px;
        font-size: var(--font-size);
        user-select: none;

        h3 {
          margin: 0;
          color: white;
        }

        span {
          color: rgba(var(--color-text), .6);
        }
      }
    `,
  ],
})
export class TimerComponent {
  @Input() value: number | null = 0;
}
