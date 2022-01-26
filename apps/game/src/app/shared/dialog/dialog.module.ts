import { NgModule } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

import { A11yModule } from '@angular/cdk/a11y';
import { DialogService } from './dialog.service';


@NgModule({
  imports: [OverlayModule, PortalModule, A11yModule],
  exports: [
    PortalModule,
  ],
  providers: [
    DialogService
  ],
})
export class DialogModule {}
