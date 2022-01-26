import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogService } from '../../dialog/dialog.service';

@Component({
  selector: 'dt-nav-level',
  template: `
    <button type="button" (click)="close()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="24px"
        width="24px"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
        />
      </svg>
    </button>
    <nav>
      <a routerLink="/training" routerLinkActive="active"> Treino </a>
      <a routerLink="/easy" routerLinkActive="active"> Fácil </a>
      <a routerLink="/medium" routerLinkActive="active"> Médio </a>
      <a routerLink="/hard" routerLinkActive="active"> Difícil </a>
    </nav>
  `,
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
        padding: 24px;
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        font-family: var(--font-heading);
        background-color: rgba(var(--color-bg), 0.8);

        border-radius: 8px;
      }
      :host button {
        background-color: transparent;
        position: absolute;
        cursor: pointer;
        z-index: 100;
        border: none;
        right: 10px;
        top: 10px;
      }
      :host svg {
        color: white;
        fill: white;
      }
      nav {
        gap: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      a:link {
        display: block;
        font-size: 200%;
        font-family: var(--font-heading);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavLevelComponent {
  constructor(readonly dialog: DialogService<NavLevelComponent>) {}

  close() {
    this.dialog.close();
  }
}
