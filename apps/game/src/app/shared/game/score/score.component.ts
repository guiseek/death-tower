import { Component, Input } from '@angular/core';

@Component({
  selector: 'dt-score',
  template: `
    <h3>{{ value }}</h3>
    <span>pontos</span>
  `,
  styles: [
    `
      :host {
        display: flex;
        gap: 10px;

        min-width: 20px;
        max-width: 160px;

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
    `
  ],
})
export class ScoreComponent  {
  @Input() value: number | null = 0;
}
