import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { GameComponent } from './game/game.component';
import { ControlModule } from '../shared/control/control.module';
import { MapModule } from '../shared/map/map.module';


@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    MapModule,
    ControlModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
