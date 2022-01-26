import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SettingsComponent } from './settings/settings.component';



@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatSliderModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports: [
    SettingsComponent
  ]
})
export class FormsModule { }
