import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './button/button.component';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu/menu-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ButtonComponent,
    MenuItemComponent,
    MenuComponent
  ],
  exports: [
    ButtonComponent,
    MenuItemComponent,
    MenuComponent
  ],
})
export class StageUiMapModule {}
