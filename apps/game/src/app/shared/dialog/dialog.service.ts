import { Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Type } from '@angular/core';

export class DialogConfig {
  height = '400px';
  width = '400px';
  hasBackdrop = true;
  disposeOnNavigation = true;
  positionStrategy?: PositionStrategy;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService<T = unknown> {
  private _config = new DialogConfig();
  _overlayRef?: OverlayRef;

  constructor(private overlay: Overlay) {}

  openDialog<C = T>(component: Type<C>, config = new DialogConfig()) {
    this._config.positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    this._overlayRef = this.overlay.create(config ?? this._config);
    this._overlayRef.attach(new ComponentPortal(component));
    return this._overlayRef;
  }

  close() {
    console.log(this._overlayRef);

    if (this._overlayRef) {
      this._overlayRef.dispose();
    }
  }
}
