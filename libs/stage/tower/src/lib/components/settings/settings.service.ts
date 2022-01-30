import { SettingsConfig } from '@death-tower/core/interfaces';
import { SettingsComponent } from './settings.component';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'platform' })
export class SettingsService {
  constructor(private dialog: MatDialog) {}

  open(data: SettingsConfig) {
    const ref = this.dialog.open(SettingsComponent, { data });
    // ref.afterClosed().subscribe(() => {});
    ref.componentInstance.form.valueChanges.subscribe((settings) => {
      data = settings;
    });

    return ref.afterClosed();
  }
}
