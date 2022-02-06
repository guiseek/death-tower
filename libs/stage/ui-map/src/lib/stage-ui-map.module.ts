import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './button/button.component';
import { MenuComponent } from './menu/menu.component';
import { MenuItemComponent } from './menu/menu-item.component';
import { ValueComponent } from './value/value.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ButtonComponent,
    MenuItemComponent,
    MenuComponent,
    ValueComponent
  ],
  exports: [
    ButtonComponent,
    MenuItemComponent,
    MenuComponent,
    ValueComponent
  ],
})
export class StageUiMapModule {}
