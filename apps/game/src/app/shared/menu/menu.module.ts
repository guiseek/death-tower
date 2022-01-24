import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuItemComponent } from './menu-item.component';



@NgModule({
  declarations: [
    MenuComponent,
    MenuItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuComponent,
    MenuItemComponent
  ]
})
export class MenuModule { }
