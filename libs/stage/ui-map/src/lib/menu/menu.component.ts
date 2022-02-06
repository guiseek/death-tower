import {
  Component,
  QueryList,
  ContentChildren,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MenuItemComponent } from './menu-item.component';

@Component({
  selector: 'map-menu',
  template: `
    <div class="dropbtn">
      <ng-content select="button"></ng-content>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
      >
        <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
      </svg>
    </div>
    <div class="dropdown-content">
      <ng-content select="[map-menu-item]"></ng-content>
    </div>
  `,
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent {
  @ContentChildren(MenuItemComponent) items!: QueryList<MenuItemComponent>;
}
