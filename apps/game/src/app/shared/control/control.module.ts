import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonControlComponent } from './button-control/button-control.component';



@NgModule({
  declarations: [
    ButtonControlComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonControlComponent
  ]
})
export class ControlModule { }
