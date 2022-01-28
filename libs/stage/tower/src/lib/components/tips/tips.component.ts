import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Tip } from './tips.service';

@Component({
  selector: 'death-tips',
  template: `
    <h1 mat-dialog-title>Dica</h1>
    <div mat-dialog-content>
      <h3 class="mat-h3">{{ data.title }}</h3>
      <p>{{ data.description }}</p>
    </div>
  `,
  styles: [],
})
export class TipsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) readonly data: Tip) {}
}
