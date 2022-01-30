import { Component, Input } from '@angular/core';

@Component({
  selector: 'death-score',
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
          color: rgba(var(--color-text), 0.6);
        }
      }

      @media (max-width: 1024px) and (orientation: portrait) {
        :host {
          flex-direction: column;
          justify-content: center;
          align-items: center;

          gap: 2px;

          h3 {
            font-size: 24px;
          }
          span {
            font-size: 16px;
          }
        }
      }
    `,
  ],
})
export class ScoreComponent {
  @Input() value: number | null = 0;
}
