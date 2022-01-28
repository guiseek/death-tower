import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'death-menu',
  template: `
    <div class="dropbtn">
      <ng-content select="button"></ng-content>
    </div>
    <div class="dropdown-content">
      <ng-content select="[death-menu-item]"></ng-content>
    </div>
  `,
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent {}